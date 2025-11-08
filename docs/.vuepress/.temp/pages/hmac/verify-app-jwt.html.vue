<template><div><h1 id="verifyappjwt-middleware-documentation" tabindex="-1"><a class="header-anchor" href="#verifyappjwt-middleware-documentation"><span>VerifyAppJwt Middleware Documentation</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>The <code v-pre>VerifyAppJwt</code> middleware provides JWT (JSON Web Token) verification for authenticated API requests. It validates JWT tokens, checks for revocation, enforces device binding, and tracks security events.</p>
<h2 id="purpose" tabindex="-1"><a class="header-anchor" href="#purpose"><span>Purpose</span></a></h2>
<p>This middleware secures protected API endpoints by:</p>
<ul>
<li><strong>JWT Validation</strong> - Verifies token signature, expiration, and structure</li>
<li><strong>Token Blacklisting</strong> - Prevents use of revoked tokens</li>
<li><strong>Device Binding</strong> - Optionally enforces device-to-token binding</li>
<li><strong>Audience/Issuer Validation</strong> - Ensures tokens are issued by correct authority</li>
<li><strong>Secret Rotation Support</strong> - Gracefully handles secret rotation</li>
<li><strong>Suspicious Activity Detection</strong> - Tracks and blocks suspicious behavior</li>
</ul>
<h2 id="security-features" tabindex="-1"><a class="header-anchor" href="#security-features"><span>Security Features</span></a></h2>
<h3 id="_1-jwt-structure-validation" tabindex="-1"><a class="header-anchor" href="#_1-jwt-structure-validation"><span>1. JWT Structure Validation</span></a></h3>
<p>Validates that the JWT contains all required claims:</p>
<ul>
<li><code v-pre>iss</code> (Issuer) - Token issuer</li>
<li><code v-pre>aud</code> (Audience) - Token audience</li>
<li><code v-pre>iat</code> (Issued At) - Token issuance timestamp</li>
<li><code v-pre>exp</code> (Expiration) - Token expiration timestamp</li>
<li><code v-pre>jti</code> (JWT ID) - Unique token identifier</li>
</ul>
<h3 id="_2-signature-verification" tabindex="-1"><a class="header-anchor" href="#_2-signature-verification"><span>2. Signature Verification</span></a></h3>
<ul>
<li>Validates JWT signature using configured secret</li>
<li>Supports HS256 algorithm</li>
<li>Constant-time comparison to prevent timing attacks</li>
<li>Supports secret rotation with previous secrets</li>
</ul>
<h3 id="_3-token-blacklisting" tabindex="-1"><a class="header-anchor" href="#_3-token-blacklisting"><span>3. Token Blacklisting</span></a></h3>
<ul>
<li>Tracks revoked tokens in Redis</li>
<li>Prevents use of revoked tokens even if valid</li>
<li>Automatic expiration when token naturally expires</li>
</ul>
<h3 id="_4-device-binding-optional" tabindex="-1"><a class="header-anchor" href="#_4-device-binding-optional"><span>4. Device Binding (Optional)</span></a></h3>
<p>When enabled, enforces that:</p>
<ul>
<li>Device ID in token matches device ID in request header</li>
<li>Both device ID and header must be present</li>
<li>Prevents token theft and unauthorized device usage</li>
</ul>
<h3 id="_5-secret-rotation" tabindex="-1"><a class="header-anchor" href="#_5-secret-rotation"><span>5. Secret Rotation</span></a></h3>
<ul>
<li>Supports graceful secret rotation</li>
<li>Tries previous secrets if current secret fails</li>
<li>Allows tokens issued with old secrets to remain valid during rotation period</li>
</ul>
<h2 id="required-headers" tabindex="-1"><a class="header-anchor" href="#required-headers"><span>Required Headers</span></a></h2>
<p>The middleware expects the following header:</p>
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
<td><code v-pre>Authorization</code></td>
<td>Bearer token</td>
<td><code v-pre>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code></td>
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
<td>Device identifier (required if device binding enabled)</td>
<td><code v-pre>device-uuid-123</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-IP</code></td>
<td>Client IP address (required in production)</td>
<td><code v-pre>203.0.113.42</code></td>
</tr>
</tbody>
</table>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2>
<p>All settings are configured in <code v-pre>config/appsecurity.php</code>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jwt'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'secret'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_APP_SECRET'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'algorithm'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'HS256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'issuer'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'APP_NAME'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Pencilbox Quiz'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'audience'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'APP_CLIENT_ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'pencilbox-quiz-mobile'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'ttl'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_TTL'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 120</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// minutes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'refresh_ttl'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_REFRESH_TTL'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// minutes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'leeway'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_LEEWAY'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 30</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// seconds</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'device'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'binding_enabled'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'DEVICE_BINDING_ENABLED'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'header_name'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-Device-ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'secret_rotation'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'enabled'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'SECRET_ROTATION_ENABLED'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'grace_period'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'SECRET_ROTATION_GRACE_PERIOD'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3600</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'jwt_previous_secrets'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">array_filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">explode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">','</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_PREVIOUS_SECRETS'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ''</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<h3 id="applying-middleware" tabindex="-1"><a class="header-anchor" href="#applying-middleware"><span>Applying Middleware</span></a></h3>
<p>Apply to routes that require JWT authentication:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Route</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">middleware</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'verify.app.jwt'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">group</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> () {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Route</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'/user/profile'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">UserController</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'profile'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Route</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">post</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'/quiz/submit'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, [</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">QuizController</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'submit'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="accessing-token-payload" tabindex="-1"><a class="header-anchor" href="#accessing-token-payload"><span>Accessing Token Payload</span></a></h3>
<p>The middleware attaches the decoded JWT payload to the request:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$payload</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">attributes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jwt_payload'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Access token claims</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$jti</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jti'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'device_id'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$scope</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'scope'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$issuedAt</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'iat'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$expiresAt</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="accessing-device-id" tabindex="-1"><a class="header-anchor" href="#accessing-device-id"><span>Accessing Device ID</span></a></h3>
<p>The middleware also provides device ID as a separate attribute:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">attributes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'device_id'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="validation-flow" tabindex="-1"><a class="header-anchor" href="#validation-flow"><span>Validation Flow</span></a></h2>
<ol>
<li><strong>Extract Token</strong> - Retrieves JWT from Authorization header</li>
<li><strong>IP Validation</strong> - Validates IP address (public IP required in production)</li>
<li><strong>Decode JWT</strong> - Decodes and validates JWT structure</li>
<li><strong>Validate Claims</strong> - Ensures all required claims are present</li>
<li><strong>Validate Audience/Issuer</strong> - Verifies token was issued by correct authority</li>
<li><strong>Check Blacklist</strong> - Verifies token hasn't been revoked</li>
<li><strong>Device Binding</strong> - Validates device binding if enabled</li>
<li><strong>Attach Payload</strong> - Attaches decoded payload to request</li>
<li><strong>Log Event</strong> - Logs successful verification</li>
</ol>
<h2 id="error-responses" tabindex="-1"><a class="header-anchor" href="#error-responses"><span>Error Responses</span></a></h2>
<p>The middleware returns standardized error responses:</p>
<h3 id="missing-token" tabindex="-1"><a class="header-anchor" href="#missing-token"><span>Missing Token</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"MISSING_TOKEN"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Authorization token missing"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-token" tabindex="-1"><a class="header-anchor" href="#invalid-token"><span>Invalid Token</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_TOKEN"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Invalid JWT token"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token-expired" tabindex="-1"><a class="header-anchor" href="#token-expired"><span>Token Expired</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"TOKEN_EXPIRED"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"JWT token has expired"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-signature" tabindex="-1"><a class="header-anchor" href="#invalid-signature"><span>Invalid Signature</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_SIGNATURE"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"JWT signature is invalid"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token-revoked" tabindex="-1"><a class="header-anchor" href="#token-revoked"><span>Token Revoked</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"TOKEN_REVOKED"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Token has been revoked"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="device-mismatch" tabindex="-1"><a class="header-anchor" href="#device-mismatch"><span>Device Mismatch</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"DEVICE_MISMATCH"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Device binding validation failed"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="public-ip-required-production" tabindex="-1"><a class="header-anchor" href="#public-ip-required-production"><span>Public IP Required (Production)</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Public IP required."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "received_ip"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"192.168.1.1"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jwt-token-structure" tabindex="-1"><a class="header-anchor" href="#jwt-token-structure"><span>JWT Token Structure</span></a></h2>
<h3 id="token-payload" tabindex="-1"><a class="header-anchor" href="#token-payload"><span>Token Payload</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "iss"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Pencilbox Quiz"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "aud"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"pencilbox-quiz-mobile"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "iat"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1699123456</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "nbf"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1699123456</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "exp"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1699125856</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "jti"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"550e8400-e29b-41d4-a716-446655440000"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "device_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"device-uuid-123"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scope"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"api"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="claims-explained" tabindex="-1"><a class="header-anchor" href="#claims-explained"><span>Claims Explained</span></a></h3>
<ul>
<li><strong>iss</strong> (Issuer): Identifies who issued the token</li>
<li><strong>aud</strong> (Audience): Identifies who the token is intended for</li>
<li><strong>iat</strong> (Issued At): Unix timestamp when token was issued</li>
<li><strong>nbf</strong> (Not Before): Unix timestamp before which token is not valid</li>
<li><strong>exp</strong> (Expiration): Unix timestamp when token expires</li>
<li><strong>jti</strong> (JWT ID): Unique identifier for the token</li>
<li><strong>device_id</strong>: Device identifier (optional, used for device binding)</li>
<li><strong>scope</strong>: Token scope/permissions (e.g., &quot;api&quot;, &quot;admin&quot;)</li>
</ul>
<h2 id="security-features-1" tabindex="-1"><a class="header-anchor" href="#security-features-1"><span>Security Features</span></a></h2>
<h3 id="suspicious-activity-detection" tabindex="-1"><a class="header-anchor" href="#suspicious-activity-detection"><span>Suspicious Activity Detection</span></a></h3>
<p>The middleware automatically tracks and blocks suspicious activity:</p>
<ul>
<li><strong>IP Tracking</strong>: Tracks failed attempts per IP address</li>
<li><strong>Device Tracking</strong>: Tracks failed attempts per device (if device ID available)</li>
<li><strong>Threshold</strong>: Configurable via <code v-pre>appsecurity.rate_limiting.suspicious_threshold</code> (default: 5)</li>
<li><strong>Block Duration</strong>: Configurable via <code v-pre>appsecurity.rate_limiting.block_duration</code> (default: 15 minutes)</li>
<li><strong>Automatic Blocking</strong>: Blocks IP/device after threshold exceeded</li>
</ul>
<h3 id="token-blacklisting" tabindex="-1"><a class="header-anchor" href="#token-blacklisting"><span>Token Blacklisting</span></a></h3>
<p>Revoked tokens are stored in Redis:</p>
<ul>
<li><strong>Key Pattern</strong>: <code v-pre>app:blacklist:{jti}</code></li>
<li><strong>TTL</strong>: Set to token expiration time</li>
<li><strong>Purpose</strong>: Prevent use of revoked tokens</li>
</ul>
<h3 id="device-binding" tabindex="-1"><a class="header-anchor" href="#device-binding"><span>Device Binding</span></a></h3>
<p>When device binding is enabled:</p>
<ol>
<li>Token must contain <code v-pre>device_id</code> claim</li>
<li>Request must include <code v-pre>X-Device-ID</code> header</li>
<li>Both values must match exactly</li>
<li>Prevents token theft and cross-device usage</li>
</ol>
<h3 id="secret-rotation" tabindex="-1"><a class="header-anchor" href="#secret-rotation"><span>Secret Rotation</span></a></h3>
<p>Supports graceful secret rotation:</p>
<ol>
<li>If token validation fails with current secret</li>
<li>Try previous secrets from configuration</li>
<li>If valid with previous secret, allow request</li>
<li>Enables zero-downtime secret rotation</li>
</ol>
<h2 id="implementation-details" tabindex="-1"><a class="header-anchor" href="#implementation-details"><span>Implementation Details</span></a></h2>
<h3 id="token-extraction" tabindex="-1"><a class="header-anchor" href="#token-extraction"><span>Token Extraction</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Extracts token from: Authorization: Bearer &#x3C;token></span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$authorization</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">header</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Authorization'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$token</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> substr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$authorization</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Remove 'Bearer ' prefix</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token-validation" tabindex="-1"><a class="header-anchor" href="#token-validation"><span>Token Validation</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Decode and validate</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$payload</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> JWT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">decode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$token</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$secret</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'HS256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Validate required claims</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$requiredClaims</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'iss'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'aud'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'iat'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jti'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">foreach</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$requiredClaims</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> as</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $claim</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">isset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$claim</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Validate audience and issuer</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$issuerValid</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> hash_equals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$expectedIssuer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'iss'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$audienceValid</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> hash_equals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$expectedAudience</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'aud'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="device-binding-validation" tabindex="-1"><a class="header-anchor" href="#device-binding-validation"><span>Device Binding Validation</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceIdHeader</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">header</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-Device-ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$tokenDeviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'device_id'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Both must be present and match</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">empty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceIdHeader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">||</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> empty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$tokenDeviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">return</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> hash_equals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceIdHeader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $tokenDeviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="request-example" tabindex="-1"><a class="header-anchor" href="#request-example"><span>Request Example</span></a></h2>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-http"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">GET</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api/v1/user/profile </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">HTTP</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1.1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Host</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> api.example.com</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Authorization</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQZW5jaWxib3ggUXVpeiIsImF1ZCI6InBlbmNpbGJveC1xdWl6LW1vYmlsZSIsImlhdCI6MTY5OTEyMzQ1NiwibmJmIjoxNjk5MTIzNDU2LCJleHAiOjE2OTkxMjU4NTYsImp0aSI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImRldmljZV9pZCI6ImRldmljZS11dWlkLTEyMyIsInNjb3BlIjoiYXBpIn0.signature</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-ID</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> device-uuid-123</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-IP</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 203.0.113.42</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Content-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application/json</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing"><span>Testing</span></a></h2>
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
<li><strong>Short Token TTL</strong> - Use short-lived tokens (default: 120 minutes)</li>
<li><strong>Implement Refresh Tokens</strong> - Use refresh token endpoint for long-lived sessions</li>
<li><strong>Enable Device Binding</strong> - Prevent token theft and unauthorized usage</li>
<li><strong>Monitor Token Usage</strong> - Track token generation, refresh, and revocation</li>
<li><strong>Rotate Secrets Regularly</strong> - Use secret rotation for enhanced security</li>
<li><strong>Log Security Events</strong> - Monitor for suspicious token usage patterns</li>
<li><strong>Use HTTPS Only</strong> - Never transmit tokens over unencrypted connections</li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="token-validation-fails" tabindex="-1"><a class="header-anchor" href="#token-validation-fails"><span>Token Validation Fails</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Secret mismatch</li>
<li>Token expired</li>
<li>Missing required claims</li>
<li>Audience/issuer mismatch</li>
</ul>
<p><strong>Debug Steps:</strong></p>
<ol>
<li>Verify JWT secret matches configuration</li>
<li>Check token expiration time</li>
<li>Validate all required claims are present</li>
<li>Compare expected vs actual issuer/audience</li>
</ol>
<h3 id="device-binding-fails" tabindex="-1"><a class="header-anchor" href="#device-binding-fails"><span>Device Binding Fails</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Device ID missing from token</li>
<li>Device ID missing from header</li>
<li>Device ID mismatch</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Ensure device ID is included when generating token</li>
<li>Include <code v-pre>X-Device-ID</code> header in requests</li>
<li>Verify device IDs match exactly</li>
</ul>
<h3 id="token-expired-too-quickly" tabindex="-1"><a class="header-anchor" href="#token-expired-too-quickly"><span>Token Expired Too Quickly</span></a></h3>
<p><strong>Solutions:</strong></p>
<ul>
<li>Increase <code v-pre>jwt.ttl</code> configuration</li>
<li>Implement refresh token mechanism</li>
<li>Use refresh endpoint before token expires</li>
</ul>
<h3 id="secret-rotation-issues" tabindex="-1"><a class="header-anchor" href="#secret-rotation-issues"><span>Secret Rotation Issues</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Previous secrets not configured</li>
<li>Grace period too short</li>
<li>Tokens issued with very old secrets</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Configure <code v-pre>jwt_previous_secrets</code> in environment</li>
<li>Increase grace period if needed</li>
<li>Ensure all tokens are refreshed before old secrets expire</li>
</ul>
<h2 id="related-documentation" tabindex="-1"><a class="header-anchor" href="#related-documentation"><span>Related Documentation</span></a></h2>
<ul>
<li><RouteLink to="/hmac/VerifyAppSignature.html">VerifyAppSignature.md</RouteLink> - HMAC signature verification middleware</li>
<li><RouteLink to="/hmac/AppTokenController.html">AppTokenController.md</RouteLink> - Token generation controller</li>
<li><RouteLink to="/hmac/AppSecurity-Combined.html">AppSecurity-Combined.md</RouteLink> - Complete security system overview</li>
</ul>
<h2 id="configuration-reference" tabindex="-1"><a class="header-anchor" href="#configuration-reference"><span>Configuration Reference</span></a></h2>
<p>See <code v-pre>config/appsecurity.php</code> for all configuration options.</p>
<hr>
<p><strong>Last Updated</strong>: November 2025<br>
<strong>Middleware</strong>: <code v-pre>App\Http\Middleware\VerifyAppJwt</code><br>
<strong>Status</strong>: ✅ Production Ready</p>
</div></template>


