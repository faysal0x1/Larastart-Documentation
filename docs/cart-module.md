# Cart Module

Lightweight, database-backed shopping cart supporting both guest and authenticated users. Items are polymorphic, so any model (e.g., Quiz, QuizBundle, SubscriptionPlan, Product) can be added using `purchasable_type` + `purchasable_id`.

## Features

- Guest and user carts with automatic merge on login
- Session cookie `cart_session` via middleware for guest carts
- Polymorphic items with custom options and metadata
- Subtotals and totals computed on retrieval
- Clean REST API for add/update/remove/clear
- Service + Facade for programmatic usage
- Auto route and migration loading via module service provider

## Enabling

The provider respects `config('modules.cart.enabled', true)`. Ensure it is enabled in your configuration (for DB-driven module toggles, see the Module Management docs).

Provider: `App\Modules\Cart\Providers\CartModuleServiceProvider`

## Database Schema

Migrations are auto-loaded by the provider:

- `carts` table: user or session scoped cart, amounts, currency, metadata, `expires_at`
- `cart_items` table: polymorphic `purchasable_type/id`, quantity, pricing, options

Key columns:

- `carts.user_id` (nullable), `carts.session_id` (guest), `guest_identifier`
- `cart_items.purchasable_type`, `cart_items.purchasable_id`

## API Routes

Prefix: `/api/cart`
Middleware: `web`, `EnsureCartSession`

- `GET /api/cart` → Show current cart (creates if missing)
- `POST /api/cart/add` → Add item
  - body: `{ product_id: int, quantity?: int }`
- `POST /api/cart/item/{itemId}/update` → Update quantity
  - body: `{ quantity: int }`
- `DELETE /api/cart/item/{itemId}` → Remove item
- `POST /api/cart/clear` → Clear cart

Middleware sets a long-lived `cart_session` cookie for guests.

## Controller

`App\Modules\Cart\Http\Controllers\CartController`

- `show(Request)` → returns JSON cart
- `add(Request)` → validates, adds via service, returns JSON or 400
- `update(Request, itemId)` → updates quantity, redirects `back()` (adjust to JSON if needed)
- `remove(itemId)` → removes item, redirects `back()` (adjust to JSON if needed)
- `clear(Request)` → clears items for current cart, returns JSON

## Service

`App\Modules\Cart\Services\CartService`

- `getOrCreateCart(sessionId?, userId?) : Cart` → resolves cart by user or session
- `mergeGuestCartWithUserCart(userId)` → merges most recent guest cart into user cart
- `addItemFor(purchasableType, purchasableId, quantity=1, options={}, sessionId?, userId?) : array` → idempotent add/merge
- `addToCart(purchasableType, purchasableId, quantity=1, options={}, sessionId?, userId?) : { success, message, cart? }`
- `updateItem(itemId, quantity) : array`
- `removeItem(itemId) : array`
- `clearCart(cartId) : array`
- `getCart(cartId) : array` → includes `items`, `subtotal`, `total`, `total_amount`, `total_items`

Notes:

- `options['unit_price']` is expected when adding generic items.
- Totals are computed server-side on retrieval.

## Models

- `Cart` (hasMany `items`, belongsTo `user`) — casts amounts to decimal(2)
- `CartItem` (belongsTo `cart`, morphTo `purchasable`) — casts price fields and JSON options

## Middleware

`EnsureCartSession` — ensures `cart_session` cookie exists and persists (30 days, SameSite=Lax).

## Facade

`App\Modules\Cart\Facades\CartModule` (alias of `modules.cart.service`)

Selected static methods (via service):

- `getOrCreateCart(sessionId?, userId?)`
- `updateItem(itemId, quantity)`
- `removeItem(itemId)`
- `clearCart(cartId)`
- `getCart(cartId)`

## Usage Examples

### API: Add to Cart (Generic)

```http
POST /api/cart/add
Content-Type: application/json

{
  "product_id": 123,
  "quantity": 2
}
```

Response:

```json
{
  "id": 10,
  "total_items": 2,
  "subtotal": 199.98,
  "total_amount": 199.98,
  "items": [
    { "id": 55, "purchasable_type": "App\\Models\\Product", "purchasable_id": 123, "quantity": 2, "unit_price": 99.99, "total_price": 199.98 }
  ]
}
```

### Service: Add a Quiz Bundle

```php
use App\Modules\Cart\Services\CartService;

$cart = app(CartService::class)->addItemFor(
    purchasableType: App\Models\QuizBundle::class,
    purchasableId: $bundleId,
    quantity: 1,
    options: ['unit_price' => 499.00],
    sessionId: request()->cookie('cart_session'),
    userId: auth()->id()
);
```

### Merge Guest Cart After Login

```php
use App\Modules\Cart\Services\CartService;

app(CartService::class)->mergeGuestCartWithUserCart((int) auth()->id());
```

## Integration Notes

- Use `purchasable_type` to point to your domain model (e.g., `App\\Models\\Quiz`, `App\\Models\\QuizBundle`).
- For purchase flows, convert cart items into Orders (see Purchase/Order/Revenue docs).
- Frontend: cart page exists in `routes/web.php` at `/cart` (Inertia page).

## Testing Tips

- Ensure `web` middleware is applied when calling the API to get session and cookies.
- For guests, verify `cart_session` cookie persists across requests.
- Unit test `CartService` for adding, updating, removing, and merging.

## Security

- CSRF applies for web-posted forms; for API calls from SPAs, ensure proper CSRF/session handling.
- Validate `quantity` and price inputs from trusted sources only.

## Roadmap

- Taxes/discount rules pipeline
- Coupons integration
- Multi-currency support
- Inventory checks and reservations


