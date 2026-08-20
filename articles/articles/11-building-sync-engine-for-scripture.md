---
title: "Building a Sync Engine for Scripture: Circuit Breakers, Redis Locks, and a Postgres Trigger I Don't Trust the ORM to Enforce"
slug: building-sync-engine-for-scripture
description: "How DeenRoot guarantees Qur'anic scripture integrity under heavy load using distributed Redis locks, circuit breakers, strict 2-second ceilings, and Postgres BEFORE UPDATE triggers."
date: 2026-08-06
tags: [django, postgresql, redis, celery, python, backend, architecture, ai]
cover: images/11-cover.jpg
diagram: images/11-diagram.jpg
---

![Building a Sync Engine for Scripture](images/11-diagram.jpg)

# Building a Sync Engine for Scripture: Circuit Breakers, Redis Locks, and a Postgres Trigger I Don't Trust the ORM to Enforce

Most backends treat a third-party API outage as a degraded-experience problem. On DeenRoot, a Qur'an platform I built solo, that framing doesn't hold — the "third-party API" is the source for the Arabic text of scripture, and "degraded" isn't allowed to mean silently wrong. That constraint shaped almost every non-trivial piece of the backend, more than the UI ever did.

The rule I settled on early: Postgres is the source of truth, and every external provider — Quran Foundation, AlQuran Cloud, Sunnah.com, Aladhan — is a hydration mechanism, never a request-time dependency. A user's request is never allowed to block on someone else's API. Here's how that's actually enforced, not just stated.

---

## Why External APIs Can't Be a Request-Time Dependency

Every read follows one path: check Postgres first. Hit and complete → serve, zero network calls. Miss or incomplete → check for a cached `not_found` (skip the network entirely) or a failed record still inside its backoff window (serve what Postgres has, flagged partial). Only then does it touch the network — and the whole chain, lock wait included, shares a hard 2-second budget before falling back to whatever's stored.

---

## The Thundering-Herd Problem: One Redis Lock, Not Fifty API Calls

If fifty requests hit a cold cache for the same ayah at once, only one of them should ever call the provider:

```python
class ResourceLock:
    """Distributed lock, one per (resource_type, resource_key), backed by
    Redis SET NX PX semantics. If 50 requests hit a cold cache for the same
    resource at once, only the request that wins `acquire()` calls the
    upstream provider — everyone else blocks until it's released, then
    re-reads Postgres (now populated) instead of calling the provider too.
    """

    def __init__(self, resource_type, resource_key, *, timeout):
        self._connection = get_redis_connection("default")
        self._lock = self._connection.lock(
            f"sync:lock:{resource_type}:{resource_key}",
            timeout=timeout,
            sleep=0.05,
        )
```

The other 49 requests don't retry the provider — they block on the lock, then re-read Postgres, which is now populated. One network call instead of fifty.

---

## Circuit Breakers: Three States, One Redis Key per Provider

Each provider — Quran Foundation, AlQuran Cloud, Aladhan — sits behind its own breaker:

```python
@property
def state(self) -> str:
    opened_at = cache.get(self._opened_at_key)
    if opened_at is None:
        return self.CLOSED
    elapsed = time.time() - opened_at
    if elapsed >= settings.SYNC_CIRCUIT_COOLDOWN_SECONDS:
        return self.HALF_OPEN
    return self.OPEN
```

Closed is normal. N consecutive failures trip it open, and it skips the provider entirely for a cooldown window — no point spending timeout budget retrying something that's already down. Once the cooldown elapses it goes half-open, and exactly one probe request is let through via an atomic `cache.add()` — a naive get-then-set here would race under concurrent load and let two probes through instead of one.

---

## Scripture Immutability: Enforcing It Twice, On Purpose

![DeenRoot Scripture Integrity Architecture](images/11-scripture-integrity.jpg)

Once an ayah's Arabic text is stored, no later provider response gets to change it — a corrupted upstream payload should never be able to silently rewrite the mushaf. The application-layer guard diffs incoming text against what's stored and refuses the write on a mismatch, logging an `IntegrityAlert`. That's the primary defense. But I don't trust it as the only defense:

```sql
CREATE OR REPLACE FUNCTION quran_ayah_protect_text_uthmani()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.text_uthmani IS NOT NULL
       AND OLD.text_uthmani <> ''
       AND NEW.text_uthmani <> OLD.text_uthmani THEN
        RAISE EXCEPTION
            'quran_ayah.text_uthmani is immutable once set (verse_key=%)',
            OLD.verse_key;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

A `BEFORE UPDATE` trigger on the ayah table, raising on any update that changes non-empty text. It's the backstop for the day some future code path — a management command, a migration, a bug — bypasses the ORM guard entirely. Belt-and-suspenders isn't over-engineering when the thing you're protecting is scripture.

---

## Where a RAG Assistant Fits into "Never Lie About Scripture"

The same constraint carries into the AI assistant: it's retrieval-augmented, answering only from content the platform has already indexed and hydrated, and a classifier checks whether its claims are actually grounded in the retrieved passages before the answer ships. It's built to never raise on a "bad" model response — an ungrounded claim gets flagged, not trusted and not hidden behind a crash.

---

## Gotchas I'd Tell Someone Building This from Scratch

- **The timeout budget is shared, not additive.** The 2-second ceiling covers the lock wait and every provider attempt combined. It's easy to add a third fallback provider and accidentally blow the budget on retries alone.
- **Provider chains live in settings, not code.** `SYNC_PROVIDER_CHAINS` is a list of import-path strings, not hardcoded classes — swapping or reordering providers is a config change, not a deploy of new logic.
- **Negative caching matters as much as positive caching.** Without caching a `not_found` result, a genuinely missing resource re-triggers the full provider chain on every request.

---

*Taimoor Khan is a full-stack engineer building SaaS platforms, AI systems, and mobile apps for startups worldwide. Currently building DeenRoot, a free Qur'an and Hadith platform, solo.*

**Available for new projects.**
