# Coupon Module

Database-backed coupons with validation rules, per-user usage limits, date windows, and minimum purchase thresholds. Exposes REST APIs and a service/facade to integrate discounts into checkout flows.

## Features

- Create/list/update/delete coupons (API + service)
- Apply coupon for a user with comprehensive validations
- Global and per-user usage limits
- Start/end date enforcement and status flag
- Minimum purchase and max discount controls
- Auto-load routes and migrations via module provider

## Enabling

Provider: `App\\Modules\\Coupon\\Providers\\CouponModuleServiceProvider`

- Respects `config('modules.coupon.enabled', true)`
- Loads `routes/api.php` and migrations automatically
- Service bound as `modules.coupon.service`

## Database Schema

Tables (auto-migrated):

- `coupons`
  - `type`, `title`, `slug`, `code`
  - `coupon_for` (optional user restriction)
  - `limit`, `user_limit`, `coupon_used`
  - `discount_type` (`percent` or `flat`), `discount`, `max_discount`
  - `minimum_purchase`
  - `start_at`, `end_at`, `status`
- `coupon_users`
  - Tracks per-user usage counts; unique `(coupon_id, user_id)`

## Routes

Prefix: `/api/coupons` (uses `web` middleware)

- `GET  /api/coupons` — List (paginated)
- `POST /api/coupons` — Create
- `GET  /api/coupons/{coupon}` — Show
- `PUT  /api/coupons/{coupon}` — Update
- `DELETE /api/coupons/{coupon}` — Delete
- `POST /api/coupons/apply` — Apply coupon
  - body: `{ code: string, user_id: int, order_total_minor?: int }`

## Service & Facade

- `Services/CouponService`
  - `list(perPage)` — paginated list
  - `create(attrs)` — validates via `CouponStoreRequest`
  - `update(coupon, attrs)` — validates via `CouponUpdateRequest`
  - `delete(coupon)`
  - `apply(code, userId, orderTotalMinor?)` — returns `{ ok, coupon?, discount_minor?, message? }`
- Facade: `App\\Modules\\Coupon\\Facades\\Coupon` → `modules.coupon.service`

Validation inside `apply` includes:

- Existence and `status` active
- Start/end window (`start_at`, `end_at`)
- Optional per-user binding (`coupon_for`)
- Minimum purchase check (`order_total_minor` vs `minimum_purchase`)
- Per-user limit and global limit
- Discount calculation:
  - `percent`: floor(order_total * percent/100), capped by `max_discount`
  - `flat`: fixed amount

## Usage Examples

### Apply Coupon via API

```http
POST /api/coupons/apply
Content-Type: application/json

{ "code": "SAVE20", "user_id": 1, "order_total_minor": 49900 }
```

Response (success):

```json
{ "ok": true, "discount_minor": 9980, "coupon": { "code": "SAVE20", "discount_type": "percent", "discount": 20 } }
```

### Service: Apply in Checkout

```php
use App\Modules\Coupon\Services\CouponService;

$result = app(CouponService::class)->apply('SAVE20', (int) auth()->id(), (int) round($cartTotal * 100));
if ($result['ok']) {
    $discountMinor = $result['discount_minor'];
    // apply discount to order total
}
```

## Integration Notes

- Use minor currency units (e.g., cents/paisa) for `order_total_minor` to avoid float errors.
- On successful application, store the coupon id/code with the pending order and decrement usage counters when the order completes (extend module as needed).
- Combine with Cart + PaymentGateway modules to reflect discounts in order totals before payment initiation.

## Testing Tips

- Create varied coupons (percent/flat, with/without `max_discount`, different windows) and validate behavior across edge cases.
- Test per-user limits through `coupon_users` increments.

## Security

- Protect management endpoints (`create/update/delete`) behind appropriate auth/permissions.
- On the client, treat all coupon messages as informational; enforce all checks server-side only.


