<template><div><h1 id="coupon-module" tabindex="-1"><a class="header-anchor" href="#coupon-module"><span>Coupon Module</span></a></h1>
<p>Database-backed coupons with validation rules, per-user usage limits, date windows, and minimum purchase thresholds. Exposes REST APIs and a service/facade to integrate discounts into checkout flows.</p>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h2>
<ul>
<li>Create/list/update/delete coupons (API + service)</li>
<li>Apply coupon for a user with comprehensive validations</li>
<li>Global and per-user usage limits</li>
<li>Start/end date enforcement and status flag</li>
<li>Minimum purchase and max discount controls</li>
<li>Auto-load routes and migrations via module provider</li>
</ul>
<h2 id="enabling" tabindex="-1"><a class="header-anchor" href="#enabling"><span>Enabling</span></a></h2>
<p>Provider: <code v-pre>App\\Modules\\Coupon\\Providers\\CouponModuleServiceProvider</code></p>
<ul>
<li>Respects <code v-pre>config('modules.coupon.enabled', true)</code></li>
<li>Loads <code v-pre>routes/api.php</code> and migrations automatically</li>
<li>Service bound as <code v-pre>modules.coupon.service</code></li>
</ul>
<h2 id="database-schema" tabindex="-1"><a class="header-anchor" href="#database-schema"><span>Database Schema</span></a></h2>
<p>Tables (auto-migrated):</p>
<ul>
<li><code v-pre>coupons</code>
<ul>
<li><code v-pre>type</code>, <code v-pre>title</code>, <code v-pre>slug</code>, <code v-pre>code</code></li>
<li><code v-pre>coupon_for</code> (optional user restriction)</li>
<li><code v-pre>limit</code>, <code v-pre>user_limit</code>, <code v-pre>coupon_used</code></li>
<li><code v-pre>discount_type</code> (<code v-pre>percent</code> or <code v-pre>flat</code>), <code v-pre>discount</code>, <code v-pre>max_discount</code></li>
<li><code v-pre>minimum_purchase</code></li>
<li><code v-pre>start_at</code>, <code v-pre>end_at</code>, <code v-pre>status</code></li>
</ul>
</li>
<li><code v-pre>coupon_users</code>
<ul>
<li>Tracks per-user usage counts; unique <code v-pre>(coupon_id, user_id)</code></li>
</ul>
</li>
</ul>
<h2 id="routes" tabindex="-1"><a class="header-anchor" href="#routes"><span>Routes</span></a></h2>
<p>Prefix: <code v-pre>/api/coupons</code> (uses <code v-pre>web</code> middleware)</p>
<ul>
<li><code v-pre>GET  /api/coupons</code> — List (paginated)</li>
<li><code v-pre>POST /api/coupons</code> — Create</li>
<li><code v-pre>GET  /api/coupons/{coupon}</code> — Show</li>
<li><code v-pre>PUT  /api/coupons/{coupon}</code> — Update</li>
<li><code v-pre>DELETE /api/coupons/{coupon}</code> — Delete</li>
<li><code v-pre>POST /api/coupons/apply</code> — Apply coupon
<ul>
<li>body: <code v-pre>{ code: string, user_id: int, order_total_minor?: int }</code></li>
</ul>
</li>
</ul>
<h2 id="service-facade" tabindex="-1"><a class="header-anchor" href="#service-facade"><span>Service &amp; Facade</span></a></h2>
<ul>
<li><code v-pre>Services/CouponService</code>
<ul>
<li><code v-pre>list(perPage)</code> — paginated list</li>
<li><code v-pre>create(attrs)</code> — validates via <code v-pre>CouponStoreRequest</code></li>
<li><code v-pre>update(coupon, attrs)</code> — validates via <code v-pre>CouponUpdateRequest</code></li>
<li><code v-pre>delete(coupon)</code></li>
<li><code v-pre>apply(code, userId, orderTotalMinor?)</code> — returns <code v-pre>{ ok, coupon?, discount_minor?, message? }</code></li>
</ul>
</li>
<li>Facade: <code v-pre>App\\Modules\\Coupon\\Facades\\Coupon</code> → <code v-pre>modules.coupon.service</code></li>
</ul>
<p>Validation inside <code v-pre>apply</code> includes:</p>
<ul>
<li>Existence and <code v-pre>status</code> active</li>
<li>Start/end window (<code v-pre>start_at</code>, <code v-pre>end_at</code>)</li>
<li>Optional per-user binding (<code v-pre>coupon_for</code>)</li>
<li>Minimum purchase check (<code v-pre>order_total_minor</code> vs <code v-pre>minimum_purchase</code>)</li>
<li>Per-user limit and global limit</li>
<li>Discount calculation:
<ul>
<li><code v-pre>percent</code>: floor(order_total * percent/100), capped by <code v-pre>max_discount</code></li>
<li><code v-pre>flat</code>: fixed amount</li>
</ul>
</li>
</ul>
<h2 id="usage-examples" tabindex="-1"><a class="header-anchor" href="#usage-examples"><span>Usage Examples</span></a></h2>
<h3 id="apply-coupon-via-api" tabindex="-1"><a class="header-anchor" href="#apply-coupon-via-api"><span>Apply Coupon via API</span></a></h3>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-http"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">POST</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api/coupons/apply</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Content-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application/json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"code"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SAVE20"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"user_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"order_total_minor"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">49900</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Response (success):</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"ok"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"discount_minor"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">9980</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"coupon"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"code"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"SAVE20"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"discount_type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"percent"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"discount"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">20</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="service-apply-in-checkout" tabindex="-1"><a class="header-anchor" href="#service-apply-in-checkout"><span>Service: Apply in Checkout</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">use</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> App\Modules\Coupon\Services\</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CouponService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> app</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CouponService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">apply</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'SAVE20'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, (</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">auth</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), (</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">round</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$cartTotal</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$result</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'ok'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    $discountMinor</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $result</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'discount_minor'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // apply discount to order total</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="integration-notes" tabindex="-1"><a class="header-anchor" href="#integration-notes"><span>Integration Notes</span></a></h2>
<ul>
<li>Use minor currency units (e.g., cents/paisa) for <code v-pre>order_total_minor</code> to avoid float errors.</li>
<li>On successful application, store the coupon id/code with the pending order and decrement usage counters when the order completes (extend module as needed).</li>
<li>Combine with Cart + PaymentGateway modules to reflect discounts in order totals before payment initiation.</li>
</ul>
<h2 id="testing-tips" tabindex="-1"><a class="header-anchor" href="#testing-tips"><span>Testing Tips</span></a></h2>
<ul>
<li>Create varied coupons (percent/flat, with/without <code v-pre>max_discount</code>, different windows) and validate behavior across edge cases.</li>
<li>Test per-user limits through <code v-pre>coupon_users</code> increments.</li>
</ul>
<h2 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h2>
<ul>
<li>Protect management endpoints (<code v-pre>create/update/delete</code>) behind appropriate auth/permissions.</li>
<li>On the client, treat all coupon messages as informational; enforce all checks server-side only.</li>
</ul>
</div></template>


