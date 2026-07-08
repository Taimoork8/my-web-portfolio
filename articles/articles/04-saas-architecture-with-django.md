---
title: "SaaS Architecture with Django: Multi-Tenancy, Billing, and Background Jobs"
slug: saas-architecture-with-django
description: "How to structure a multi-tenant Django SaaS product — picking a tenancy model, wiring up Stripe billing, and keeping background jobs from becoming the app's weakest link."
date: 2026-07-08
tags: [django, saas, architecture, python, backend]
cover: images/04-cover.svg
---

![SaaS Architecture with Django](images/04-cover.svg)

# SaaS Architecture with Django: Multi-Tenancy, Billing, and Background Jobs

Django wasn't built for multi-tenant SaaS specifically, but its batteries-included philosophy — ORM, admin, auth, migrations — makes it one of the fastest paths to a real SaaS product if you make the right structural decisions before customer data starts piling up. The three decisions that matter most: how you isolate tenant data, how you wire up billing without it becoming a second source of truth, and how you keep background jobs from silently failing.

## Choosing a tenancy model

![Tenancy models](images/04-diagram.svg)

There are three real options, and the right one depends on your compliance requirements and expected customer count, not on which one is trendiest.

**Shared schema with a `tenant_id` column** is the simplest to build and the cheapest to run. Every table gets a `tenant_id` foreign key, and every queryset filters on it. It scales to thousands of tenants on a single database and is the right default for most B2B SaaS products.

```python
class Invoice(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

class TenantManager(models.Manager):
    def for_tenant(self, tenant):
        return self.get_queryset().filter(tenant=tenant)
```

The risk with this model is entirely self-inflicted: a single missing `.filter(tenant=tenant)` in a queryset is a cross-tenant data leak. Mitigate it with a base queryset class that forces tenant scoping and a test suite that specifically checks for tenant isolation on every list/detail endpoint.

**Schema-per-tenant** (via `django-tenants` on Postgres) gives each tenant its own Postgres schema under one database. It's a meaningfully stronger isolation guarantee — a bug in a queryset can't accidentally leak across schemas — at the cost of migration complexity, since every migration now runs once per tenant schema.

**Database-per-tenant** is the strongest isolation and the operational ceiling most teams don't need until an enterprise contract specifically requires it (dedicated infrastructure for compliance reasons). It's expensive to run and to migrate, and it's rarely justified below enterprise-tier pricing.

Start with shared schema plus `tenant_id`. Migrate specific large or compliance-sensitive customers to their own schema or database only when a real requirement forces it — not preemptively.

## Billing: Stripe as the source of truth for subscription state, not your database

The recurring mistake in Django SaaS billing is trying to track subscription state independently in your own models and keep it in sync with Stripe through application logic. Instead, treat Stripe webhooks as the only writer of subscription status, and your database as a read cache of that state.

```python
@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)

    if event['type'] == 'customer.subscription.updated':
        sub = event['data']['object']
        Tenant.objects.filter(stripe_customer_id=sub['customer']).update(
            plan=sub['items']['data'][0]['price']['nickname'],
            status=sub['status'],
            current_period_end=timezone.datetime.fromtimestamp(sub['current_period_end']),
        )

    return HttpResponse(status=200)
```

Never gate feature access on a status your own code set optimistically after a checkout redirect — always gate on the state the webhook wrote, and always verify the webhook signature. A checkout succeeding client-side and a subscription actually activating are two different events, and the gap between them is exactly where "I paid but don't have access" support tickets come from.

## Background jobs: Celery, and the failure modes that actually happen

Every SaaS app accumulates background work — sending emails, generating reports, syncing with third-party APIs, processing webhooks. Celery with Redis as the broker is the standard pairing in the Django ecosystem, but the default configuration has a failure mode worth designing around from day one: a task that raises an exception silently disappears unless you've configured retries and dead-letter handling.

```python
@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_invoice_email(self, invoice_id):
    try:
        invoice = Invoice.objects.get(id=invoice_id)
        send_mail_with_pdf(invoice)
    except SMTPServerDisconnected as exc:
        raise self.retry(exc=exc)
    except Invoice.DoesNotExist:
        logger.error(f"Invoice {invoice_id} not found, not retrying")
```

Distinguish between transient failures worth retrying (a flaky SMTP connection) and permanent ones that should fail loudly instead of retrying into a black hole (a record that no longer exists). Pair Celery with Flower or a monitoring integration so a spike in failed tasks surfaces as an alert, not as a customer complaint three days later.

## Per-tenant rate limits and resource fairness

A single noisy tenant — a runaway script hitting your API, a report job over a huge dataset — shouldn't degrade the experience for every other tenant on shared infrastructure. Apply throttling scoped to tenant, not just to user:

```python
class TenantRateThrottle(UserRateThrottle):
    def get_cache_key(self, request, view):
        tenant_id = request.tenant.id
        return f"throttle_tenant_{tenant_id}"
```

## What actually determines whether this scales

None of shared-schema multi-tenancy, Stripe billing, or Celery is exotic — DRF and Django's ecosystem support all three well. What determines whether a Django SaaS product survives its first hundred customers is discipline: every queryset scoped to tenant without exception, subscription state always sourced from Stripe's webhooks rather than optimistic application logic, and background jobs that fail loudly instead of disappearing quietly. Get those three right early, and the rest of the SaaS is ordinary Django.
