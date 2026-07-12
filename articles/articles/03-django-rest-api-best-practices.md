---
title: "Django REST API Best Practices That Actually Survive Production"
slug: django-rest-api-best-practices
description: "Serializer patterns, permission design, pagination, and the N+1 queries that will quietly wreck your API's performance if you don't catch them early."
date: 2026-07-03
tags: [django, drf, python, api, backend]
cover: images/03-cover.svg
---

![Django REST API Best Practices](images/03-cover.svg)

# Django REST API Best Practices That Actually Survive Production

Django REST Framework (currently at 3.17, with Django 6.0 and Python 3.14 support) makes it easy to ship an API fast and just as easy to ship one that falls over the moment real traffic hits it. The gap between a working DRF API and a production-grade one is almost never about DRF's feature set — it's about a handful of decisions made in the first week that are expensive to unwind later.

## Serializers: separate read and write shapes early

The single most common DRF mistake is using one serializer for both reading and writing a resource. It works until the model grows a computed field, a nested relation, or a field that should be writable on create but read-only on update.

```python
class OrderReadSerializer(serializers.ModelSerializer):
    customer = CustomerSummarySerializer(read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'total', 'status', 'created_at']


class OrderWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['customer', 'items', 'status']

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")
        return value
```

Then in the ViewSet, pick the serializer based on the action:

```python
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('customer').prefetch_related('items')

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return OrderWriteSerializer
        return OrderReadSerializer
```

This alone eliminates an entire category of bugs where a client is unexpectedly able to overwrite a computed or server-controlled field.

## The N+1 query problem hiding in every list endpoint

![DRF request flow](images/03-diagram.svg)

A serializer that looks innocent — `customer = CustomerSummarySerializer(read_only=True)` — triggers a separate database query for every single row when the queryset wasn't built with `select_related`. On a list endpoint returning 20 orders, that's 20 extra queries executed sequentially, invisible in local testing with a handful of rows and catastrophic once a table has real volume.

The fix is always at the queryset level, not the serializer level:

```python
# N+1: one query per order to fetch customer, one per order to fetch items
queryset = Order.objects.all()

# Fixed: select_related for FK/O2O, prefetch_related for M2M/reverse FK
queryset = Order.objects.select_related('customer').prefetch_related('items__product')
```

Install `django-silk` or turn on `django-debug-toolbar` in a staging environment and look at the query count on every list endpoint before it ships. If a list of 10 items runs more than 3-4 queries, there's almost always an unoptimized relation underneath.

## Permissions: object-level, not just view-level

`IsAuthenticated` on a ViewSet stops anonymous access, but it does nothing to stop User A from fetching User B's order by guessing an ID. That requires object-level permission checks:

```python
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.customer.user == request.user

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
```

`has_object_permission` only runs on detail routes (retrieve, update, destroy) automatically when you call `get_object()` — it is not applied to list querysets for you. Filter the queryset itself for list views:

```python
def get_queryset(self):
    return Order.objects.filter(customer__user=self.request.user)
```

Skipping this is how IDOR (Insecure Direct Object Reference) vulnerabilities end up in production APIs that otherwise look secure.

## Pagination is not optional

An unpaginated list endpoint is a denial-of-service vector waiting for a large enough table. Set a sane default globally rather than per-view:

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.CursorPagination',
    'PAGE_SIZE': 25,
}
```

Cursor pagination is worth the switch from the default page-number pagination for any endpoint with high write volume — page-number pagination can skip or duplicate rows when records are inserted between page requests, cursor pagination doesn't.

## Versioning from day one

Retrofitting API versioning after external clients depend on your endpoints is painful. Namespace it from the first commit:

```python
urlpatterns = [
    path('api/v1/', include('api.v1.urls')),
]
```

URL path versioning (`/api/v1/`) is the most common approach because it's visible in logs, cacheable, and requires no header inspection — trade-offs that matter more than the purity argument for header-based versioning in most real projects.

## Rate limiting and throttling

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.UserRateThrottle',
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'user': '1000/day',
        'anon': '100/day',
    },
}
```

Without throttling, a single misbehaving client script or a scraper can consume disproportionate backend capacity, and there is no way to distinguish that from a genuine traffic spike after the fact.

## The checklist that actually matters

Before an endpoint ships: does the queryset use `select_related`/`prefetch_related` for every nested serializer field, does every detail view check object-level permissions in addition to authentication, is pagination configured with a sane page size, and is there a rate limit on anything that accepts unauthenticated requests. None of this is exotic DRF knowledge — it's the difference between an API that works in a demo and one that survives its first real month of traffic.
