<template><div><h1 id="verifyappsignature-middleware-documentation" tabindex="-1"><a class="header-anchor" href="#verifyappsignature-middleware-documentation"><span>VerifyAppSignature Middleware Documentation</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>The <code v-pre>VerifyAppSignature</code> middleware provides HMAC-based signature verification for mobile app API requests. It implements a multi-layered security approach to prevent replay attacks, validate request authenticity, and track suspicious activity.</p>
<h2 id="purpose" tabindex="-1"><a class="header-anchor" href="#purpose"><span>Purpose</span></a></h2>
<p>This middleware validates mobile app requests before they reach your controllers by:</p>
<ul>
<li><strong>HMAC Signature Validation</strong> - Ensures requests are authentic and haven't been tampered with</li>
<li><strong>Nonce Uniqueness</strong> - Prevents replay attacks by tracking used nonces</li>
<li><strong>Timestamp Validation</strong> - Rejects requests that are too old</li>
<li><strong>Client ID Validation</strong> - Verifies the client is authorized</li>
<li><strong>IP Address Validation</strong> - Enforces public IP requirements in production</li>
<li><strong>Device Tracking</strong> - Optionally tracks and manages device information</li>
<li><strong>Suspicious Activity Detection</strong> - Automatically blocks IPs/devices after repeated failures</li>
</ul>
<h2 id="security-features" tabindex="-1"><a class="header-anchor" href="#security-features"><span>Security Features</span></a></h2>
<h3 id="_1-simple-hmac-signature" tabindex="-1"><a class="header-anchor" href="#_1-simple-hmac-signature"><span>1. Simple HMAC Signature</span></a></h3>
<p>The middleware uses a simple HMAC SHA256 signature scheme:</p>
<p><strong>String to Sign:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>method + uri + nonce + timestamp + clientId</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Example:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>POST/api/v1/auth/app-tokenabc123def4561699123456pencilbox-quiz-mobile</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Signature Generation:</strong></p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$signature</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> hash_hmac</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'sha256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $stringToSign</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $clientSecret</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_2-nonce-replay-prevention" tabindex="-1"><a class="header-anchor" href="#_2-nonce-replay-prevention"><span>2. Nonce Replay Prevention</span></a></h3>
<ul>
<li>Each request must include a unique nonce</li>
<li>Nonces are stored in Redis with a TTL (default: 5 minutes)</li>
<li>Reused nonces are rejected immediately</li>
<li>Prevents attackers from replaying captured requests</li>
</ul>
<h3 id="_3-timestamp-validation" tabindex="-1"><a class="header-anchor" href="#_3-timestamp-validation"><span>3. Timestamp Validation</span></a></h3>
<ul>
<li>Requests must include a Unix timestamp</li>
<li>Timestamp must be within tolerance window (default: 2 minutes)</li>
<li>Prevents replay of old requests even if nonce is unique</li>
<li>Configurable via <code v-pre>appsecurity.hmac.timestamp_tolerance</code></li>
</ul>
<h3 id="_4-client-id-validation" tabindex="-1"><a class="header-anchor" href="#_4-client-id-validation"><span>4. Client ID Validation</span></a></h3>
<ul>
<li>Validates client ID against configured value</li>
<li>Uses constant-time comparison (<code v-pre>hash_equals</code>) to prevent timing attacks</li>
<li>Configured via <code v-pre>appsecurity.client.id</code></li>
</ul>
<h2 id="required-headers" tabindex="-1"><a class="header-anchor" href="#required-headers"><span>Required Headers</span></a></h2>
<p>The middleware expects the following headers:</p>
<table>
<thead>
<tr>
<th>Header</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>X-App-Signature</code></td>
<td>HMAC SHA256 signature</td>
<td><code v-pre>a1b2c3d4e5f6...</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Nonce</code></td>
<td>Unique nonce (UUID recommended)</td>
<td><code v-pre>550e8400-e29b-41d4-a716-446655440000</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Timestamp</code></td>
<td>Unix timestamp</td>
<td><code v-pre>1699123456</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Client-ID</code></td>
<td>Client identifier</td>
<td><code v-pre>pencilbox-quiz-mobile</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-IP</code></td>
<td>Client IP address (required in production)</td>
<td><code v-pre>203.0.113.42</code></td>
</tr>
</tbody>
</table>
<h3 id="optional-headers" tabindex="-1"><a class="header-anchor" href="#optional-headers"><span>Optional Headers</span></a></h3>
<table>
<thead>
<tr>
<th>Header</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>X-Device-ID</code></td>
<td>Device identifier</td>
<td><code v-pre>device-uuid-123</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-Type</code></td>
<td>Device type</td>
<td><code v-pre>iOS</code>, <code v-pre>Android</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-Model</code></td>
<td>Device model</td>
<td><code v-pre>iPhone 14 Pro</code></td>
</tr>
<tr>
<td><code v-pre>X-OS-Version</code></td>
<td>Operating system version</td>
<td><code v-pre>iOS 17.0</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Version</code></td>
<td>App version</td>
<td><code v-pre>1.2.3</code></td>
</tr>
</tbody>
</table>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2>
<p>All settings are configured in <code v-pre>config/appsecurity.php</code>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'hmac'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'algorithm'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'sha256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'nonce_ttl'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 5 minutes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'timestamp_tolerance'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">120</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 2 minutes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'header_name'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-App-Signature'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'nonce_header'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-App-Nonce'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'timestamp_header'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-App-Timestamp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'client_id_header'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-App-Client-ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'ip_header'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-Device-IP'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'client'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'id'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'APP_CLIENT_ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'pencilbox-quiz-mobile'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'secret'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'APP_CLIENT_SECRET'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<h3 id="applying-middleware" tabindex="-1"><a class="header-anchor" href="#applying-middleware"><span>Applying Middleware</span></a></h3>
<p>Apply to routes that require HMAC authentication:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Route</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">middleware</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'verify.app.signature'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">group</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> () {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Route</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">post</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'/auth/app-token'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">AppTokenController</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'generateToken'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="accessing-client-ip" tabindex="-1"><a class="header-anchor" href="#accessing-client-ip"><span>Accessing Client IP</span></a></h3>
<p>The middleware stores the client IP in request attributes:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$clientIp</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">attributes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'client_ip'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="validation-flow" tabindex="-1"><a class="header-anchor" href="#validation-flow"><span>Validation Flow</span></a></h2>
<ol>
<li><strong>Extract Headers</strong> - Retrieves signature, nonce, timestamp, and client ID</li>
<li><strong>IP Validation</strong> - Validates IP address (public IP required in production)</li>
<li><strong>Header Validation</strong> - Ensures all required headers are present</li>
<li><strong>Client ID Validation</strong> - Verifies client ID matches configuration</li>
<li><strong>Timestamp Validation</strong> - Checks timestamp is within tolerance window</li>
<li><strong>Nonce Validation</strong> - Verifies nonce hasn't been used before</li>
<li><strong>Signature Validation</strong> - Validates HMAC signature</li>
<li><strong>Store Nonce</strong> - Stores nonce in Redis to prevent reuse</li>
<li><strong>Device Tracking</strong> - Tracks device information if device ID provided</li>
<li><strong>Log Event</strong> - Logs successful verification</li>
</ol>
<h2 id="error-responses" tabindex="-1"><a class="header-anchor" href="#error-responses"><span>Error Responses</span></a></h2>
<p>The middleware returns standardized error responses:</p>
<h3 id="missing-headers" tabindex="-1"><a class="header-anchor" href="#missing-headers"><span>Missing Headers</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"MISSING_HEADERS"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Required security headers missing"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-client-id" tabindex="-1"><a class="header-anchor" href="#invalid-client-id"><span>Invalid Client ID</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_CLIENT_ID"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Invalid client ID"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-timestamp" tabindex="-1"><a class="header-anchor" href="#invalid-timestamp"><span>Invalid Timestamp</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_TIMESTAMP"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Request timestamp is too old or invalid"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nonce-reuse" tabindex="-1"><a class="header-anchor" href="#nonce-reuse"><span>Nonce Reuse</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"NONCE_REUSE"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Nonce has already been used"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-signature" tabindex="-1"><a class="header-anchor" href="#invalid-signature"><span>Invalid Signature</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_SIGNATURE"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Invalid HMAC signature</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="public-ip-required-production" tabindex="-1"><a class="header-anchor" href="#public-ip-required-production"><span>Public IP Required (Production)</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Public IP required."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "received_ip"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"192.168.1.1"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="security-features-1" tabindex="-1"><a class="header-anchor" href="#security-features-1"><span>Security Features</span></a></h2>
<h3 id="suspicious-activity-detection" tabindex="-1"><a class="header-anchor" href="#suspicious-activity-detection"><span>Suspicious Activity Detection</span></a></h3>
<p>The middleware automatically tracks and blocks suspicious activity:</p>
<ul>
<li><strong>Threshold</strong>: Configurable via <code v-pre>appsecurity.rate_limiting.suspicious_threshold</code> (default: 5)</li>
<li><strong>Block Duration</strong>: Configurable via <code v-pre>appsecurity.rate_limiting.block_duration</code> (default: 15 minutes)</li>
<li><strong>Tracking</strong>: Tracks failed attempts per IP address</li>
<li><strong>Automatic Blocking</strong>: Blocks IP after threshold exceeded</li>
</ul>
<h3 id="device-tracking" tabindex="-1"><a class="header-anchor" href="#device-tracking"><span>Device Tracking</span></a></h3>
<p>If a device ID is provided, the middleware:</p>
<ul>
<li>Creates or updates device record in database</li>
<li>Tracks device metadata (type, model, OS version, app version)</li>
<li>Updates last seen information (IP, user agent, request URI)</li>
<li>Checks if device is blocked and rejects if so</li>
</ul>
<h3 id="security-audit-logging" tabindex="-1"><a class="header-anchor" href="#security-audit-logging"><span>Security Audit Logging</span></a></h3>
<p>All security events are logged to:</p>
<ul>
<li><strong>Database</strong>: <code v-pre>security_audit_logs</code> table</li>
<li><strong>File Logs</strong>: Configured logging channel</li>
<li><strong>Structured Logs</strong>: JSON format when enabled</li>
</ul>
<p>Events logged:</p>
<ul>
<li><code v-pre>signature_verified</code> - Successful signature verification</li>
<li><code v-pre>signature_verification_failed</code> - Failed verification attempts</li>
<li><code v-pre>suspicious_activity</code> - Suspicious activity detected</li>
<li><code v-pre>ip_blocked</code> - IP address blocked</li>
</ul>
<h2 id="implementation-details" tabindex="-1"><a class="header-anchor" href="#implementation-details"><span>Implementation Details</span></a></h2>
<h3 id="signature-generation-client-side" tabindex="-1"><a class="header-anchor" href="#signature-generation-client-side"><span>Signature Generation (Client Side)</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-javascript"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Example JavaScript implementation</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> crypto</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'crypto'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generateSignature</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">nonce</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">timestamp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">clientId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">secret</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> stringToSign</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> method</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> uri</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> nonce</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> timestamp</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> clientId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> crypto</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createHmac</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'sha256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">secret</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">update</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">stringToSign</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">digest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'hex'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Usage</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> method</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'POST'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> uri</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '/api/v1/auth/app-token'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> nonce</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generateUUID</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> timestamp</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> Math</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">floor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">Date</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">now</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toString</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> clientId</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'pencilbox-quiz-mobile'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> secret</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'your-client-secret'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> signature</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generateSignature</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">nonce</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">timestamp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">clientId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">secret</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="request-example" tabindex="-1"><a class="header-anchor" href="#request-example"><span>Request Example</span></a></h3>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-http"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">POST</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api/v1/auth/app-token </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">HTTP</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1.1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Host</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> api.example.com</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Signature</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Nonce</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 550e8400-e29b-41d4-a716-446655440000</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Timestamp</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 1699123456</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Client-ID</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pencilbox-quiz-mobile</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-IP</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 203.0.113.42</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-ID</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> device-uuid-123</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> iOS</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-Model</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> iPhone 14 Pro</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-OS-Version</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> iOS 17.0</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Version</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 1.2.3</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Content-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application/json</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing"><span>Testing</span></a></h2>
<h3 id="disabling-middleware-development" tabindex="-1"><a class="header-anchor" href="#disabling-middleware-development"><span>Disabling Middleware (Development)</span></a></h3>
<p>The middleware can be temporarily disabled for testing:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> handle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Request</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Closure</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">): </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Skip validation</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // ... rest of validation code</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>⚠️ Warning</strong>: Never disable in production!</p>
<h3 id="testing-with-postman" tabindex="-1"><a class="header-anchor" href="#testing-with-postman"><span>Testing with Postman</span></a></h3>
<p>The middleware allows Postman requests with private IPs for testing:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$userAgent</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">header</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'User-Agent'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">str_contains</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$userAgent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Postman'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // Enforce public IP validation</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<ol>
<li><strong>Always Use HTTPS</strong> - HMAC signatures don't protect against man-in-the-middle attacks</li>
<li><strong>Rotate Secrets Regularly</strong> - Use secret rotation for enhanced security</li>
<li><strong>Monitor Logs</strong> - Regularly review security audit logs for suspicious activity</li>
<li><strong>Set Appropriate TTLs</strong> - Balance security with usability for nonce and timestamp tolerances</li>
<li><strong>Use Strong Secrets</strong> - Generate cryptographically secure client secrets</li>
<li><strong>Implement Rate Limiting</strong> - Combine with rate limiting middleware for additional protection</li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="signature-validation-fails" tabindex="-1"><a class="header-anchor" href="#signature-validation-fails"><span>Signature Validation Fails</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Incorrect string-to-sign format</li>
<li>Secret mismatch between client and server</li>
<li>URL encoding issues (ensure URI matches exactly)</li>
<li>Clock skew (adjust timestamp tolerance)</li>
</ul>
<p><strong>Debug Steps:</strong></p>
<ol>
<li>Verify client secret matches server configuration</li>
<li>Log the string-to-sign on both client and server</li>
<li>Compare generated signatures</li>
<li>Check timestamp synchronization</li>
</ol>
<h3 id="nonce-already-used" tabindex="-1"><a class="header-anchor" href="#nonce-already-used"><span>Nonce Already Used</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Client reusing nonces</li>
<li>Redis not clearing expired nonces</li>
<li>Multiple requests with same nonce</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Generate new UUID for each request</li>
<li>Ensure Redis TTL is working correctly</li>
<li>Check for duplicate request sending</li>
</ul>
<h3 id="timestamp-validation-fails" tabindex="-1"><a class="header-anchor" href="#timestamp-validation-fails"><span>Timestamp Validation Fails</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Clock skew between client and server</li>
<li>Timestamp tolerance too strict</li>
<li>Client sending future timestamps</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Increase <code v-pre>timestamp_tolerance</code> if needed</li>
<li>Synchronize client/server clocks</li>
<li>Use NTP for time synchronization</li>
</ul>
<h2 id="related-documentation" tabindex="-1"><a class="header-anchor" href="#related-documentation"><span>Related Documentation</span></a></h2>
<ul>
<li><RouteLink to="/hmac/VerifyAppJwt.html">VerifyAppJwt.md</RouteLink> - JWT token verification middleware</li>
<li><RouteLink to="/hmac/AppTokenController.html">AppTokenController.md</RouteLink> - Token generation controller</li>
<li><RouteLink to="/hmac/AppSecurity-Combined.html">AppSecurity-Combined.md</RouteLink> - Complete security system overview</li>
</ul>
<h2 id="configuration-reference" tabindex="-1"><a class="header-anchor" href="#configuration-reference"><span>Configuration Reference</span></a></h2>
<p>See <code v-pre>config/appsecurity.php</code> for all configuration options.</p>
<hr>
<p><strong>Last Updated</strong>: November 2025<br>
<strong>Middleware</strong>: <code v-pre>App\Http\Middleware\VerifyAppSignature</code><br>
<strong>Status</strong>: ✅ Production Ready</p>
</div></template>


