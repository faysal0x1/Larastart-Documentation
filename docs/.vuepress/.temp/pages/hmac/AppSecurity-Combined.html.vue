<template><div><h1 id="app-security-system-combined-documentation" tabindex="-1"><a class="header-anchor" href="#app-security-system-combined-documentation"><span>App Security System - Combined Documentation</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>The Pencilbox Quiz mobile app security system provides a comprehensive, multi-layered authentication and authorization framework. It combines HMAC signature verification, JWT token management, device tracking, and security monitoring to create a robust security solution.</p>
<h2 id="architecture" tabindex="-1"><a class="header-anchor" href="#architecture"><span>Architecture</span></a></h2>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Mobile App Client                        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            │ 1. HMAC Authenticated Request</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           VerifyAppSignature Middleware                      │</span></span>
<span class="line"><span>│  • HMAC Signature Validation                                 │</span></span>
<span class="line"><span>│  • Nonce Replay Prevention                                   │</span></span>
<span class="line"><span>│  • Timestamp Validation                                      │</span></span>
<span class="line"><span>│  • Client ID Validation                                      │</span></span>
<span class="line"><span>│  • IP Address Validation                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            │ 2. Validated Request</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              AppTokenController                               │</span></span>
<span class="line"><span>│  • Token Generation                                          │</span></span>
<span class="line"><span>│  • Token Refresh                                             │</span></span>
<span class="line"><span>│  • Token Revocation                                          │</span></span>
<span class="line"><span>│  • Device Tracking                                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            │ 3. JWT Token Response</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Mobile App Client                         │</span></span>
<span class="line"><span>│              (Stores JWT Token)                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            │ 4. Bearer Token Request</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              VerifyAppJwt Middleware                          │</span></span>
<span class="line"><span>│  • JWT Signature Validation                                  │</span></span>
<span class="line"><span>│  • Token Expiration Check                                    │</span></span>
<span class="line"><span>│  • Token Blacklist Check                                     │</span></span>
<span class="line"><span>│  • Device Binding Validation                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            │ 5. Authenticated Request</span></span>
<span class="line"><span>                            ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              Protected API Endpoints                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="components" tabindex="-1"><a class="header-anchor" href="#components"><span>Components</span></a></h2>
<h3 id="_1-verifyappsignature-middleware" tabindex="-1"><a class="header-anchor" href="#_1-verifyappsignature-middleware"><span>1. VerifyAppSignature Middleware</span></a></h3>
<p><strong>Purpose</strong>: Validates HMAC signatures for token generation endpoints</p>
<p><strong>Key Features</strong>:</p>
<ul>
<li>Simple HMAC SHA256 signature validation</li>
<li>Nonce-based replay attack prevention</li>
<li>Timestamp freshness validation</li>
<li>Client ID verification</li>
<li>IP address validation (production)</li>
<li>Device tracking</li>
<li>Suspicious activity detection</li>
</ul>
<p><strong>Documentation</strong>: <RouteLink to="/hmac/VerifyAppSignature.html">VerifyAppSignature.md</RouteLink></p>
<h3 id="_2-verifyappjwt-middleware" tabindex="-1"><a class="header-anchor" href="#_2-verifyappjwt-middleware"><span>2. VerifyAppJwt Middleware</span></a></h3>
<p><strong>Purpose</strong>: Validates JWT tokens for protected API endpoints</p>
<p><strong>Key Features</strong>:</p>
<ul>
<li>JWT signature and structure validation</li>
<li>Token expiration and not-before claims</li>
<li>Token blacklist checking</li>
<li>Audience and issuer validation</li>
<li>Device binding (optional)</li>
<li>Secret rotation support</li>
<li>Suspicious activity detection</li>
</ul>
<p><strong>Documentation</strong>: <RouteLink to="/hmac/VerifyAppJwt.html">VerifyAppJwt.md</RouteLink></p>
<h3 id="_3-apptokencontroller" tabindex="-1"><a class="header-anchor" href="#_3-apptokencontroller"><span>3. AppTokenController</span></a></h3>
<p><strong>Purpose</strong>: Manages JWT token lifecycle</p>
<p><strong>Key Features</strong>:</p>
<ul>
<li>Token generation</li>
<li>Token refresh</li>
<li>Token revocation</li>
<li>Token information retrieval</li>
<li>Device tracking</li>
<li>Security audit logging</li>
</ul>
<p><strong>Documentation</strong>: <RouteLink to="/hmac/AppTokenController.html">AppTokenController.md</RouteLink></p>
<h2 id="authentication-flow" tabindex="-1"><a class="header-anchor" href="#authentication-flow"><span>Authentication Flow</span></a></h2>
<h3 id="step-1-generate-token" tabindex="-1"><a class="header-anchor" href="#step-1-generate-token"><span>Step 1: Generate Token</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1. Client generates HMAC signature:</span></span>
<span class="line"><span>   - String to sign: method + uri + nonce + timestamp + clientId</span></span>
<span class="line"><span>   - Signature: HMAC-SHA256(stringToSign, clientSecret)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. Client sends request with headers:</span></span>
<span class="line"><span>   - X-App-Signature: &#x3C;signature></span></span>
<span class="line"><span>   - X-App-Nonce: &#x3C;unique-nonce></span></span>
<span class="line"><span>   - X-App-Timestamp: &#x3C;unix-timestamp></span></span>
<span class="line"><span>   - X-App-Client-ID: &#x3C;client-id></span></span>
<span class="line"><span>   - X-Device-ID: &#x3C;device-id> (optional)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. VerifyAppSignature middleware validates:</span></span>
<span class="line"><span>   - Signature matches</span></span>
<span class="line"><span>   - Nonce is unique</span></span>
<span class="line"><span>   - Timestamp is fresh</span></span>
<span class="line"><span>   - Client ID is valid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. AppTokenController generates JWT token:</span></span>
<span class="line"><span>   - Creates unique JTI</span></span>
<span class="line"><span>   - Builds JWT payload</span></span>
<span class="line"><span>   - Signs with JWT secret</span></span>
<span class="line"><span>   - Stores JTI in Redis</span></span>
<span class="line"><span>   - Tracks device</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. Client receives JWT token:</span></span>
<span class="line"><span>   - access_token: &#x3C;jwt-token></span></span>
<span class="line"><span>   - expires_in: &#x3C;seconds></span></span>
<span class="line"><span>   - jti: &#x3C;token-id></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step-2-use-token" tabindex="-1"><a class="header-anchor" href="#step-2-use-token"><span>Step 2: Use Token</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1. Client includes token in requests:</span></span>
<span class="line"><span>   - Authorization: Bearer &#x3C;jwt-token></span></span>
<span class="line"><span>   - X-Device-ID: &#x3C;device-id> (if device binding enabled)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. VerifyAppJwt middleware validates:</span></span>
<span class="line"><span>   - JWT signature</span></span>
<span class="line"><span>   - Token expiration</span></span>
<span class="line"><span>   - Token blacklist status</span></span>
<span class="line"><span>   - Device binding (if enabled)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Request proceeds to controller:</span></span>
<span class="line"><span>   - JWT payload attached to request</span></span>
<span class="line"><span>   - Device ID available in attributes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step-3-refresh-token" tabindex="-1"><a class="header-anchor" href="#step-3-refresh-token"><span>Step 3: Refresh Token</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1. Client sends refresh request:</span></span>
<span class="line"><span>   - Authorization: Bearer &#x3C;current-token></span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. AppTokenController:</span></span>
<span class="line"><span>   - Validates current token</span></span>
<span class="line"><span>   - Generates new token</span></span>
<span class="line"><span>   - Blacklists old token</span></span>
<span class="line"><span>   - Returns new token</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Client updates stored token</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step-4-revoke-token" tabindex="-1"><a class="header-anchor" href="#step-4-revoke-token"><span>Step 4: Revoke Token</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1. Client sends revoke request:</span></span>
<span class="line"><span>   - Authorization: Bearer &#x3C;token></span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. AppTokenController:</span></span>
<span class="line"><span>   - Decodes token</span></span>
<span class="line"><span>   - Blacklists token in Redis</span></span>
<span class="line"><span>   - Logs revocation event</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. Token can no longer be used</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="security-features" tabindex="-1"><a class="header-anchor" href="#security-features"><span>Security Features</span></a></h2>
<h3 id="_1-hmac-signature-protection" tabindex="-1"><a class="header-anchor" href="#_1-hmac-signature-protection"><span>1. HMAC Signature Protection</span></a></h3>
<p><strong>Purpose</strong>: Prevent request tampering and ensure authenticity</p>
<p><strong>Implementation</strong>:</p>
<ul>
<li>Simple string-to-sign: <code v-pre>method + uri + nonce + timestamp + clientId</code></li>
<li>HMAC SHA256 signature</li>
<li>Constant-time comparison to prevent timing attacks</li>
</ul>
<p><strong>Configuration</strong>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'hmac'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'algorithm'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'sha256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'timestamp_tolerance'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">120</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 2 minutes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'nonce_ttl'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 5 minutes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-nonce-replay-prevention" tabindex="-1"><a class="header-anchor" href="#_2-nonce-replay-prevention"><span>2. Nonce Replay Prevention</span></a></h3>
<p><strong>Purpose</strong>: Prevent replay attacks</p>
<p><strong>Implementation</strong>:</p>
<ul>
<li>Unique nonce required per request</li>
<li>Nonces stored in Redis with TTL</li>
<li>Reused nonces rejected immediately</li>
</ul>
<p><strong>Storage</strong>:</p>
<ul>
<li>Redis key: <code v-pre>app:nonce:{nonce}</code></li>
<li>TTL: 5 minutes (configurable)</li>
</ul>
<h3 id="_3-timestamp-validation" tabindex="-1"><a class="header-anchor" href="#_3-timestamp-validation"><span>3. Timestamp Validation</span></a></h3>
<p><strong>Purpose</strong>: Prevent replay of old requests</p>
<p><strong>Implementation</strong>:</p>
<ul>
<li>Unix timestamp required in request</li>
<li>Must be within tolerance window (default: 2 minutes)</li>
<li>Rejects requests outside window</li>
</ul>
<p><strong>Configuration</strong>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'hmac'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'timestamp_tolerance'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">120</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// seconds</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-jwt-token-management" tabindex="-1"><a class="header-anchor" href="#_4-jwt-token-management"><span>4. JWT Token Management</span></a></h3>
<p><strong>Purpose</strong>: Secure, stateless authentication</p>
<p><strong>Features</strong>:</p>
<ul>
<li>Short-lived tokens (default: 120 minutes)</li>
<li>Unique JTI per token</li>
<li>Token blacklisting support</li>
<li>Secret rotation support</li>
</ul>
<p><strong>Token Structure</strong>:</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "iss"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Pencilbox Quiz"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "aud"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"pencilbox-quiz-mobile"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "iat"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1699123456</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "exp"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1699125856</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "jti"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"unique-token-id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "device_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"device-uuid"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scope"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"api"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-device-binding" tabindex="-1"><a class="header-anchor" href="#_5-device-binding"><span>5. Device Binding</span></a></h3>
<p><strong>Purpose</strong>: Prevent token theft and unauthorized device usage</p>
<p><strong>Implementation</strong>:</p>
<ul>
<li>Device ID embedded in JWT token</li>
<li>Device ID must match request header</li>
<li>Prevents cross-device token usage</li>
</ul>
<p><strong>Configuration</strong>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'device'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'binding_enabled'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'header_name'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-Device-ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-token-blacklisting" tabindex="-1"><a class="header-anchor" href="#_6-token-blacklisting"><span>6. Token Blacklisting</span></a></h3>
<p><strong>Purpose</strong>: Immediate token revocation</p>
<p><strong>Implementation</strong>:</p>
<ul>
<li>Revoked tokens stored in Redis</li>
<li>TTL set to token expiration time</li>
<li>Checked on every request</li>
</ul>
<p><strong>Storage</strong>:</p>
<ul>
<li>Redis key: <code v-pre>app:blacklist:{jti}</code></li>
<li>TTL: Until token naturally expires</li>
</ul>
<h3 id="_7-suspicious-activity-detection" tabindex="-1"><a class="header-anchor" href="#_7-suspicious-activity-detection"><span>7. Suspicious Activity Detection</span></a></h3>
<p><strong>Purpose</strong>: Automatic threat detection and blocking</p>
<p><strong>Implementation</strong>:</p>
<ul>
<li>Tracks failed authentication attempts</li>
<li>Blocks IP/device after threshold</li>
<li>Configurable thresholds and durations</li>
</ul>
<p><strong>Configuration</strong>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'rate_limiting'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'suspicious_threshold'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'block_duration'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">900</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 15 minutes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-security-audit-logging" tabindex="-1"><a class="header-anchor" href="#_8-security-audit-logging"><span>8. Security Audit Logging</span></a></h3>
<p><strong>Purpose</strong>: Track security events for monitoring and forensics</p>
<p><strong>Events Logged</strong>:</p>
<ul>
<li>Signature verification (success/failure)</li>
<li>Token generation</li>
<li>Token refresh</li>
<li>Token revocation</li>
<li>Suspicious activity</li>
<li>IP/device blocking</li>
</ul>
<p><strong>Storage</strong>:</p>
<ul>
<li>Database: <code v-pre>security_audit_logs</code> table</li>
<li>File logs: Configured logging channel</li>
<li>Structured JSON format</li>
</ul>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2>
<h3 id="environment-variables" tabindex="-1"><a class="header-anchor" href="#environment-variables"><span>Environment Variables</span></a></h3>
<div class="language-env line-numbers-mode" data-highlighter="shiki" data-ext="env" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-env"><span class="line"><span># Client Configuration</span></span>
<span class="line"><span>APP_CLIENT_ID=pencilbox-quiz-mobile</span></span>
<span class="line"><span>APP_CLIENT_SECRET=your-secure-secret-here</span></span>
<span class="line"><span></span></span>
<span class="line"><span># JWT Configuration</span></span>
<span class="line"><span>JWT_APP_SECRET=your-jwt-secret-here</span></span>
<span class="line"><span>JWT_TTL=120</span></span>
<span class="line"><span>JWT_REFRESH_TTL=60</span></span>
<span class="line"><span></span></span>
<span class="line"><span># HMAC Configuration</span></span>
<span class="line"><span>HMAC_NONCE_TTL=300</span></span>
<span class="line"><span>HMAC_TIMESTAMP_TOLERANCE=120</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Device Binding</span></span>
<span class="line"><span>DEVICE_BINDING_ENABLED=true</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Rate Limiting</span></span>
<span class="line"><span>SUSPICIOUS_THRESHOLD=5</span></span>
<span class="line"><span>BLOCK_DURATION=900</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Secret Rotation</span></span>
<span class="line"><span>SECRET_ROTATION_ENABLED=true</span></span>
<span class="line"><span>JWT_PREVIOUS_SECRETS=old-secret-1,old-secret-2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Logging</span></span>
<span class="line"><span>SECURITY_LOG_CHANNEL=security</span></span>
<span class="line"><span>SECURITY_LOG_LEVEL=info</span></span>
<span class="line"><span>SECURITY_STRUCTURED_LOGS=true</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configuration-file" tabindex="-1"><a class="header-anchor" href="#configuration-file"><span>Configuration File</span></a></h3>
<p>All settings in <code v-pre>config/appsecurity.php</code>:</p>
<ul>
<li><code v-pre>client</code> - Client ID and secret</li>
<li><code v-pre>jwt</code> - JWT token settings</li>
<li><code v-pre>hmac</code> - HMAC signature settings</li>
<li><code v-pre>device</code> - Device binding settings</li>
<li><code v-pre>rate_limiting</code> - Rate limiting and blocking</li>
<li><code v-pre>redis_keys</code> - Redis key patterns</li>
<li><code v-pre>logging</code> - Security logging configuration</li>
<li><code v-pre>secret_rotation</code> - Secret rotation settings</li>
</ul>
<h2 id="request-response-examples" tabindex="-1"><a class="header-anchor" href="#request-response-examples"><span>Request/Response Examples</span></a></h2>
<h3 id="generate-token-request" tabindex="-1"><a class="header-anchor" href="#generate-token-request"><span>Generate Token Request</span></a></h3>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-http"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">POST</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api/v1/auth/app-token </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">HTTP</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1.1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Host</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> api.example.com</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Signature</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Nonce</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 550e8400-e29b-41d4-a716-446655440000</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Timestamp</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 1699123456</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-App-Client-ID</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pencilbox-quiz-mobile</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-IP</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 203.0.113.42</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-ID</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> device-uuid-123</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> iOS</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Content-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application/json</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Response</strong>:</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "access_token"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "token_type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Bearer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "expires_in"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7200</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scope"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"api"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "jti"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"550e8400-e29b-41d4-a716-446655440000"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="protected-api-request" tabindex="-1"><a class="header-anchor" href="#protected-api-request"><span>Protected API Request</span></a></h3>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-http"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">GET</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /api/v1/user/profile </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">HTTP</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1.1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Host</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> api.example.com</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Authorization</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">X-Device-ID</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> device-uuid-123</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Content-Type</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application/json</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="error-codes" tabindex="-1"><a class="header-anchor" href="#error-codes"><span>Error Codes</span></a></h2>
<h3 id="hmac-authentication-errors" tabindex="-1"><a class="header-anchor" href="#hmac-authentication-errors"><span>HMAC Authentication Errors</span></a></h3>
<table>
<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>MISSING_HEADERS</code></td>
<td>Required security headers missing</td>
</tr>
<tr>
<td><code v-pre>INVALID_CLIENT_ID</code></td>
<td>Invalid client ID</td>
</tr>
<tr>
<td><code v-pre>INVALID_TIMESTAMP</code></td>
<td>Request timestamp is too old or invalid</td>
</tr>
<tr>
<td><code v-pre>NONCE_REUSE</code></td>
<td>Nonce has already been used</td>
</tr>
<tr>
<td><code v-pre>INVALID_SIGNATURE</code></td>
<td>Invalid HMAC signature</td>
</tr>
</tbody>
</table>
<h3 id="jwt-authentication-errors" tabindex="-1"><a class="header-anchor" href="#jwt-authentication-errors"><span>JWT Authentication Errors</span></a></h3>
<table>
<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>MISSING_TOKEN</code></td>
<td>Authorization token missing</td>
</tr>
<tr>
<td><code v-pre>INVALID_TOKEN</code></td>
<td>Invalid JWT token</td>
</tr>
<tr>
<td><code v-pre>TOKEN_EXPIRED</code></td>
<td>JWT token has expired</td>
</tr>
<tr>
<td><code v-pre>INVALID_SIGNATURE</code></td>
<td>JWT signature is invalid</td>
</tr>
<tr>
<td><code v-pre>TOKEN_REVOKED</code></td>
<td>Token has been revoked</td>
</tr>
<tr>
<td><code v-pre>DEVICE_MISMATCH</code></td>
<td>Device binding validation failed</td>
</tr>
</tbody>
</table>
<h3 id="token-management-errors" tabindex="-1"><a class="header-anchor" href="#token-management-errors"><span>Token Management Errors</span></a></h3>
<table>
<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>DEVICE_ID_REQUIRED</code></td>
<td>Device ID is required for token generation</td>
</tr>
<tr>
<td><code v-pre>TOKEN_GENERATION_FAILED</code></td>
<td>Failed to generate access token</td>
</tr>
<tr>
<td><code v-pre>TOKEN_REFRESH_FAILED</code></td>
<td>Failed to refresh access token</td>
</tr>
<tr>
<td><code v-pre>TOKEN_REVOCATION_FAILED</code></td>
<td>Failed to revoke token</td>
</tr>
</tbody>
</table>
<h2 id="security-best-practices" tabindex="-1"><a class="header-anchor" href="#security-best-practices"><span>Security Best Practices</span></a></h2>
<h3 id="_1-client-implementation" tabindex="-1"><a class="header-anchor" href="#_1-client-implementation"><span>1. Client Implementation</span></a></h3>
<ul>
<li><strong>Store Secrets Securely</strong>: Use secure storage (keychain/keystore)</li>
<li><strong>Generate Strong Nonces</strong>: Use UUIDs or cryptographically random values</li>
<li><strong>Synchronize Clocks</strong>: Use NTP for accurate timestamps</li>
<li><strong>Handle Errors Gracefully</strong>: Implement retry logic with backoff</li>
<li><strong>Rotate Tokens</strong>: Refresh tokens before expiration</li>
<li><strong>Revoke on Logout</strong>: Always revoke tokens on user logout</li>
</ul>
<h3 id="_2-server-configuration" tabindex="-1"><a class="header-anchor" href="#_2-server-configuration"><span>2. Server Configuration</span></a></h3>
<ul>
<li><strong>Use Strong Secrets</strong>: Generate cryptographically secure secrets</li>
<li><strong>Enable Device Binding</strong>: Prevent token theft</li>
<li><strong>Set Appropriate TTLs</strong>: Balance security with usability</li>
<li><strong>Monitor Logs</strong>: Regularly review security audit logs</li>
<li><strong>Rotate Secrets</strong>: Implement secret rotation strategy</li>
<li><strong>Use HTTPS Only</strong>: Never allow unencrypted connections</li>
<li><strong>Implement Rate Limiting</strong>: Protect against brute force attacks</li>
</ul>
<h3 id="_3-monitoring-and-alerting" tabindex="-1"><a class="header-anchor" href="#_3-monitoring-and-alerting"><span>3. Monitoring and Alerting</span></a></h3>
<ul>
<li><strong>Track Failed Attempts</strong>: Monitor signature and token validation failures</li>
<li><strong>Alert on Suspicious Activity</strong>: Set up alerts for threshold breaches</li>
<li><strong>Monitor Token Usage</strong>: Track token generation, refresh, and revocation patterns</li>
<li><strong>Review Audit Logs</strong>: Regularly review security audit logs</li>
<li><strong>Track Device Activity</strong>: Monitor device registration and usage</li>
</ul>
<h2 id="troubleshooting-guide" tabindex="-1"><a class="header-anchor" href="#troubleshooting-guide"><span>Troubleshooting Guide</span></a></h2>
<h3 id="common-issues" tabindex="-1"><a class="header-anchor" href="#common-issues"><span>Common Issues</span></a></h3>
<h4 id="_1-signature-validation-fails" tabindex="-1"><a class="header-anchor" href="#_1-signature-validation-fails"><span>1. Signature Validation Fails</span></a></h4>
<p><strong>Symptoms</strong>: <code v-pre>INVALID_SIGNATURE</code> error</p>
<p><strong>Causes</strong>:</p>
<ul>
<li>Secret mismatch</li>
<li>Incorrect string-to-sign format</li>
<li>URL encoding issues</li>
<li>Clock skew</li>
</ul>
<p><strong>Solutions</strong>:</p>
<ul>
<li>Verify client secret matches server</li>
<li>Log and compare string-to-sign</li>
<li>Ensure URI matches exactly</li>
<li>Synchronize clocks</li>
</ul>
<h4 id="_2-nonce-already-used" tabindex="-1"><a class="header-anchor" href="#_2-nonce-already-used"><span>2. Nonce Already Used</span></a></h4>
<p><strong>Symptoms</strong>: <code v-pre>NONCE_REUSE</code> error</p>
<p><strong>Causes</strong>:</p>
<ul>
<li>Client reusing nonces</li>
<li>Redis TTL issues</li>
<li>Duplicate requests</li>
</ul>
<p><strong>Solutions</strong>:</p>
<ul>
<li>Generate new UUID per request</li>
<li>Check Redis connectivity</li>
<li>Implement request deduplication</li>
</ul>
<h4 id="_3-token-expired" tabindex="-1"><a class="header-anchor" href="#_3-token-expired"><span>3. Token Expired</span></a></h4>
<p><strong>Symptoms</strong>: <code v-pre>TOKEN_EXPIRED</code> error</p>
<p><strong>Causes</strong>:</p>
<ul>
<li>Token TTL too short</li>
<li>Client not refreshing</li>
<li>Clock skew</li>
</ul>
<p><strong>Solutions</strong>:</p>
<ul>
<li>Increase JWT TTL if needed</li>
<li>Implement refresh before expiration</li>
<li>Synchronize clocks</li>
</ul>
<h4 id="_4-device-binding-fails" tabindex="-1"><a class="header-anchor" href="#_4-device-binding-fails"><span>4. Device Binding Fails</span></a></h4>
<p><strong>Symptoms</strong>: <code v-pre>DEVICE_MISMATCH</code> error</p>
<p><strong>Causes</strong>:</p>
<ul>
<li>Device ID missing from token</li>
<li>Device ID missing from header</li>
<li>Device ID mismatch</li>
</ul>
<p><strong>Solutions</strong>:</p>
<ul>
<li>Include device ID when generating token</li>
<li>Include device ID in requests</li>
<li>Verify device IDs match</li>
</ul>
<h2 id="api-endpoints-summary" tabindex="-1"><a class="header-anchor" href="#api-endpoints-summary"><span>API Endpoints Summary</span></a></h2>
<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Method</th>
<th>Auth</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>/api/v1/auth/app-token</code></td>
<td>POST</td>
<td>HMAC</td>
<td>Generate new JWT token</td>
</tr>
<tr>
<td><code v-pre>/api/v1/auth/app-token/refresh</code></td>
<td>POST</td>
<td>JWT</td>
<td>Refresh existing token</td>
</tr>
<tr>
<td><code v-pre>/api/v1/auth/app-token/revoke</code></td>
<td>POST</td>
<td>JWT</td>
<td>Revoke token</td>
</tr>
<tr>
<td><code v-pre>/api/v1/auth/app-token/info</code></td>
<td>GET</td>
<td>JWT</td>
<td>Get token information</td>
</tr>
</tbody>
</table>
<h2 id="related-documentation" tabindex="-1"><a class="header-anchor" href="#related-documentation"><span>Related Documentation</span></a></h2>
<ul>
<li><RouteLink to="/hmac/VerifyAppSignature.html">VerifyAppSignature.md</RouteLink> - HMAC signature middleware</li>
<li><RouteLink to="/hmac/VerifyAppJwt.html">VerifyAppJwt.md</RouteLink> - JWT verification middleware</li>
<li><RouteLink to="/hmac/AppTokenController.html">AppTokenController.md</RouteLink> - Token management controller</li>
<li><RouteLink to="/hmac/API_DOCUMENTATION.html">API_DOCUMENTATION.md</RouteLink> - General API documentation</li>
<li><RouteLink to="/hmac/api-overview.html">api-overview.md</RouteLink> - API overview</li>
</ul>
<h2 id="support" tabindex="-1"><a class="header-anchor" href="#support"><span>Support</span></a></h2>
<p>For issues or questions:</p>
<ul>
<li><strong>Documentation</strong>: See individual component documentation</li>
<li><strong>Configuration</strong>: Check <code v-pre>config/appsecurity.php</code></li>
<li><strong>Logs</strong>: Review security audit logs</li>
<li><strong>Support</strong>: Contact your administrator</li>
</ul>
<hr>
<p><strong>Last Updated</strong>: November 2025<br>
<strong>System Status</strong>: ✅ Production Ready<br>
<strong>Version</strong>: 1.0</p>
</div></template>


