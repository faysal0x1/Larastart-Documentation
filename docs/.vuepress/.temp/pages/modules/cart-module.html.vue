<template><div><h1 id="cart-module" tabindex="-1"><a class="header-anchor" href="#cart-module"><span>Cart Module</span></a></h1>
<p>Lightweight, database-backed shopping cart supporting both guest and authenticated users. Items are polymorphic, so any model (e.g., Quiz, QuizBundle, SubscriptionPlan, Product) can be added using <code v-pre>purchasable_type</code> + <code v-pre>purchasable_id</code>.</p>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h2>
<ul>
<li>Guest and user carts with automatic merge on login</li>
<li>Session cookie <code v-pre>cart_session</code> via middleware for guest carts</li>
<li>Polymorphic items with custom options and metadata</li>
<li>Subtotals and totals computed on retrieval</li>
<li>Clean REST API for add/update/remove/clear</li>
<li>Service + Facade for programmatic usage</li>
<li>Auto route and migration loading via module service provider</li>
</ul>
<h2 id="enabling" tabindex="-1"><a class="header-anchor" href="#enabling"><span>Enabling</span></a></h2>
<p>The provider respects <code v-pre>config('modules.cart.enabled', true)</code>. Ensure it is enabled in your configuration (for DB-driven module toggles, see the Module Management docs).</p>
<p>Provider: <code v-pre>App\Modules\Cart\Providers\CartModuleServiceProvider</code></p>
<h2 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h2>
<p>Migrations are auto-loaded by the provider:</p>
<ul>
<li><code v-pre>carts</code> table: user or session scoped cart, amounts, currency, metadata, <code v-pre>expires_at</code></li>
<li><code v-pre>cart_items</code> table: polymorphic <code v-pre>purchasable_type/id</code>, quantity, pricing, options</li>
</ul>
<p>Key columns:</p>
<ul>
<li><code v-pre>carts.user_id</code> (nullable), <code v-pre>carts.session_id</code> (guest), <code v-pre>guest_identifier</code></li>
<li><code v-pre>cart_items.purchasable_type</code>, <code v-pre>cart_items.purchasable_id</code></li>
</ul>
<h2 id="api-routes" tabindex="-1"><a class="header-anchor" href="#api-routes"><span>API Routes</span></a></h2>
<p>Prefix: <code v-pre>/api/cart</code>
Middleware: <code v-pre>web</code>, <code v-pre>EnsureCartSession</code></p>
<ul>
<li><code v-pre>GET /api/cart</code> → Show current cart (creates if missing)</li>
<li><code v-pre>POST /api/cart/add</code> → Add item
<ul>
<li>body: <code v-pre>{ product_id: int, quantity?: int }</code></li>
</ul>
</li>
<li><code v-pre>POST /api/cart/item/{itemId}/update</code> → Update quantity
<ul>
<li>body: <code v-pre>{ quantity: int }</code></li>
</ul>
</li>
<li><code v-pre>DELETE /api/cart/item/{itemId}</code> → Remove item</li>
<li><code v-pre>POST /api/cart/clear</code> → Clear cart</li>
</ul>
<p>Middleware sets a long-lived <code v-pre>cart_session</code> cookie for guests.</p>
<h2 id="controller" tabindex="-1"><a class="header-anchor" href="#controller"><span>Controller</span></a></h2>
<p><code v-pre>App\Modules\Cart\Http\Controllers\CartController</code></p>
<ul>
<li><code v-pre>show(Request)</code> → returns JSON cart</li>
<li><code v-pre>add(Request)</code> → validates, adds via service, returns JSON or 400</li>
<li><code v-pre>update(Request, itemId)</code> → updates quantity, redirects <code v-pre>back()</code> (adjust to JSON if needed)</li>
<li><code v-pre>remove(itemId)</code> → removes item, redirects <code v-pre>back()</code> (adjust to JSON if needed)</li>
<li><code v-pre>clear(Request)</code> → clears items for current cart, returns JSON</li>
</ul>
<h2 id="service" tabindex="-1"><a class="header-anchor" href="#service"><span>Service</span></a></h2>
<p><code v-pre>App\Modules\Cart\Services\CartService</code></p>
<ul>
<li><code v-pre>getOrCreateCart(sessionId?, userId?) : Cart</code> → resolves cart by user or session</li>
<li><code v-pre>mergeGuestCartWithUserCart(userId)</code> → merges most recent guest cart into user cart</li>
<li><code v-pre>addItemFor(purchasableType, purchasableId, quantity=1, options={}, sessionId?, userId?) : array</code> → idempotent add/merge</li>
<li><code v-pre>addToCart(purchasableType, purchasableId, quantity=1, options={}, sessionId?, userId?) : { success, message, cart? }</code></li>
<li><code v-pre>updateItem(itemId, quantity) : array</code></li>
<li><code v-pre>removeItem(itemId) : array</code></li>
<li><code v-pre>clearCart(cartId) : array</code></li>
<li><code v-pre>getCart(cartId) : array</code> → includes <code v-pre>items</code>, <code v-pre>subtotal</code>, <code v-pre>total</code>, <code v-pre>total_amount</code>, <code v-pre>total_items</code></li>
</ul>
<p>Notes:</p>
<ul>
<li><code v-pre>options['unit_price']</code> is expected when adding generic items.</li>
<li>Totals are computed server-side on retrieval.</li>
</ul>
<h2 id="models" tabindex="-1"><a class="header-anchor" href="#models"><span>Models</span></a></h2>
<ul>
<li><code v-pre>Cart</code> (hasMany <code v-pre>items</code>, belongsTo <code v-pre>user</code>) — casts amounts to decimal(2)</li>
<li><code v-pre>CartItem</code> (belongsTo <code v-pre>cart</code>, morphTo <code v-pre>purchasable</code>) — casts price fields and JSON options</li>
</ul>
<h2 id="middleware" tabindex="-1"><a class="header-anchor" href="#middleware"><span>Middleware</span></a></h2>
<p><code v-pre>EnsureCartSession</code> — ensures <code v-pre>cart_session</code> cookie exists and persists (30 days, SameSite=Lax).</p>
<h2 id="facade" tabindex="-1"><a class="header-anchor" href="#facade"><span>Facade</span></a></h2>
<p><code v-pre>App\Modules\Cart\Facades\CartModule</code> (alias of <code v-pre>modules.cart.service</code>)</p>
<p>Selected static methods (via service):</p>
<ul>
<li><code v-pre>getOrCreateCart(sessionId?, userId?)</code></li>
<li><code v-pre>updateItem(itemId, quantity)</code></li>
<li><code v-pre>removeItem(itemId)</code></li>
<li><code v-pre>clearCart(cartId)</code></li>
<li><code v-pre>getCart(cartId)</code></li>
</ul>
<h2 id="usage-examples" tabindex="-1"><a class="header-anchor" href="#usage-examples"><span>Usage Examples</span></a></h2>
<h3 id="api-add-to-cart-generic" tabindex="-1"><a class="header-anchor" href="#api-add-to-cart-generic"><span>API: Add to Cart (Generic)</span></a></h3>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-http"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">POST</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api/cart/add</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Content-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application/json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "product_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">123</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "quantity"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Response:</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "total_items"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "subtotal"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">199.98</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "total_amount"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">199.98</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "items"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">55</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"purchasable_type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"App</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\\</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Models</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\\</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Product"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"purchasable_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">123</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"quantity"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"unit_price"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">99.99</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"total_price"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">199.98</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="service-add-a-quiz-bundle" tabindex="-1"><a class="header-anchor" href="#service-add-a-quiz-bundle"><span>Service: Add a Quiz Bundle</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">use</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> App\Modules\Cart\Services\</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CartService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$cart</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> app</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CartService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addItemFor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    purchasableType: App\Models\</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">QuizBundle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    purchasableId: </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$bundleId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    quantity: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    options: [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'unit_price'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">499.00</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    sessionId: </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cookie</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'cart_session'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    userId: </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">auth</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="merge-guest-cart-after-login" tabindex="-1"><a class="header-anchor" href="#merge-guest-cart-after-login"><span>Merge Guest Cart After Login</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">use</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> App\Modules\Cart\Services\</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CartService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">app</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CartService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mergeGuestCartWithUserCart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">((</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">auth</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="integration-notes" tabindex="-1"><a class="header-anchor" href="#integration-notes"><span>Integration Notes</span></a></h2>
<ul>
<li>Use <code v-pre>purchasable_type</code> to point to your domain model (e.g., <code v-pre>App\\Models\\Quiz</code>, <code v-pre>App\\Models\\QuizBundle</code>).</li>
<li>For purchase flows, convert cart items into Orders (see Purchase/Order/Revenue docs).</li>
<li>Frontend: cart page exists in <code v-pre>routes/web.php</code> at <code v-pre>/cart</code> (Inertia page).</li>
</ul>
<h2 id="testing-tips" tabindex="-1"><a class="header-anchor" href="#testing-tips"><span>Testing Tips</span></a></h2>
<ul>
<li>Ensure <code v-pre>web</code> middleware is applied when calling the API to get session and cookies.</li>
<li>For guests, verify <code v-pre>cart_session</code> cookie persists across requests.</li>
<li>Unit test <code v-pre>CartService</code> for adding, updating, removing, and merging.</li>
</ul>
<h2 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h2>
<ul>
<li>CSRF applies for web-posted forms; for API calls from SPAs, ensure proper CSRF/session handling.</li>
<li>Validate <code v-pre>quantity</code> and price inputs from trusted sources only.</li>
</ul>
<h2 id="roadmap" tabindex="-1"><a class="header-anchor" href="#roadmap"><span>Roadmap</span></a></h2>
<ul>
<li>Taxes/discount rules pipeline</li>
<li>Coupons integration</li>
<li>Multi-currency support</li>
<li>Inventory checks and reservations</li>
</ul>
</div></template>


