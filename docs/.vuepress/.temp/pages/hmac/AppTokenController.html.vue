<template><div><h1 id="apptokencontroller-documentation" tabindex="-1"><a class="header-anchor" href="#apptokencontroller-documentation"><span>AppTokenController Documentation</span></a></h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>The <code v-pre>AppTokenController</code> handles JWT token generation, refresh, and revocation for mobile app authentication. It provides OAuth-lite functionality with short-lived tokens and secure token management.</p>
<h2 id="purpose" tabindex="-1"><a class="header-anchor" href="#purpose"><span>Purpose</span></a></h2>
<p>This controller manages the complete token lifecycle:</p>
<ul>
<li><strong>Token Generation</strong> - Creates new JWT tokens for authenticated clients</li>
<li><strong>Token Refresh</strong> - Issues new tokens while invalidating old ones</li>
<li><strong>Token Revocation</strong> - Blacklists tokens to prevent further use</li>
<li><strong>Token Information</strong> - Provides token metadata and claims</li>
<li><strong>Device Tracking</strong> - Tracks device information for security</li>
<li><strong>Security Logging</strong> - Logs all token-related events</li>
</ul>
<h2 id="endpoints" tabindex="-1"><a class="header-anchor" href="#endpoints"><span>Endpoints</span></a></h2>
<h3 id="_1-generate-token" tabindex="-1"><a class="header-anchor" href="#_1-generate-token"><span>1. Generate Token</span></a></h3>
<p><strong>Endpoint:</strong> <code v-pre>POST /api/v1/auth/app-token</code></p>
<p>Generates a new JWT access token for the authenticated client.</p>
<h4 id="request-headers" tabindex="-1"><a class="header-anchor" href="#request-headers"><span>Request Headers</span></a></h4>
<table>
<thead>
<tr>
<th>Header</th>
<th>Required</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>X-App-Signature</code></td>
<td>Yes</td>
<td>HMAC signature</td>
<td><code v-pre>a1b2c3d4...</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Nonce</code></td>
<td>Yes</td>
<td>Unique nonce</td>
<td><code v-pre>550e8400-...</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Timestamp</code></td>
<td>Yes</td>
<td>Unix timestamp</td>
<td><code v-pre>1699123456</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Client-ID</code></td>
<td>Yes</td>
<td>Client ID</td>
<td><code v-pre>pencilbox-quiz-mobile</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-ID</code></td>
<td>Conditional*</td>
<td>Device identifier</td>
<td><code v-pre>device-uuid-123</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-Type</code></td>
<td>No</td>
<td>Device type</td>
<td><code v-pre>iOS</code>, <code v-pre>Android</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-Model</code></td>
<td>No</td>
<td>Device model</td>
<td><code v-pre>iPhone 14 Pro</code></td>
</tr>
<tr>
<td><code v-pre>X-OS-Version</code></td>
<td>No</td>
<td>OS version</td>
<td><code v-pre>iOS 17.0</code></td>
</tr>
<tr>
<td><code v-pre>X-App-Version</code></td>
<td>No</td>
<td>App version</td>
<td><code v-pre>1.2.3</code></td>
</tr>
</tbody>
</table>
<p>*Required if device binding is enabled</p>
<h4 id="request-body" tabindex="-1"><a class="header-anchor" href="#request-body"><span>Request Body</span></a></h4>
<p>None required (empty body or <code v-pre>{}</code>)</p>
<h4 id="response-success" tabindex="-1"><a class="header-anchor" href="#response-success"><span>Response (Success)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "access_token"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "token_type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Bearer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "expires_in"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7200</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scope"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"api"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "jti"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"550e8400-e29b-41d4-a716-446655440000"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="response-error" tabindex="-1"><a class="header-anchor" href="#response-error"><span>Response (Error)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"DEVICE_ID_REQUIRED"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Device ID is required for token generation"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="token-payload-structure" tabindex="-1"><a class="header-anchor" href="#token-payload-structure"><span>Token Payload Structure</span></a></h4>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-refresh-token" tabindex="-1"><a class="header-anchor" href="#_2-refresh-token"><span>2. Refresh Token</span></a></h3>
<p><strong>Endpoint:</strong> <code v-pre>POST /api/v1/auth/app-token/refresh</code></p>
<p>Refreshes an existing JWT token by issuing a new token and blacklisting the old one.</p>
<h4 id="request-headers-1" tabindex="-1"><a class="header-anchor" href="#request-headers-1"><span>Request Headers</span></a></h4>
<table>
<thead>
<tr>
<th>Header</th>
<th>Required</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Authorization</code></td>
<td>Yes</td>
<td>Bearer token</td>
<td><code v-pre>Bearer eyJhbGci...</code></td>
</tr>
<tr>
<td><code v-pre>X-Device-ID</code></td>
<td>Conditional*</td>
<td>Device identifier</td>
<td><code v-pre>device-uuid-123</code></td>
</tr>
</tbody>
</table>
<p>*Required if device binding is enabled</p>
<h4 id="request-body-1" tabindex="-1"><a class="header-anchor" href="#request-body-1"><span>Request Body</span></a></h4>
<p>None required</p>
<h4 id="response-success-1" tabindex="-1"><a class="header-anchor" href="#response-success-1"><span>Response (Success)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "access_token"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "token_type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Bearer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "expires_in"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7200</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scope"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"api"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "jti"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"new-uuid-here"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="response-error-1" tabindex="-1"><a class="header-anchor" href="#response-error-1"><span>Response (Error)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"MISSING_TOKEN"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Authorization token missing"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_TOKEN"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Invalid or expired token"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"TOKEN_REVOKED"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Token has been revoked"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-revoke-token" tabindex="-1"><a class="header-anchor" href="#_3-revoke-token"><span>3. Revoke Token</span></a></h3>
<p><strong>Endpoint:</strong> <code v-pre>POST /api/v1/auth/app-token/revoke</code></p>
<p>Revokes (blacklists) a JWT token to prevent further use.</p>
<h4 id="request-headers-2" tabindex="-1"><a class="header-anchor" href="#request-headers-2"><span>Request Headers</span></a></h4>
<table>
<thead>
<tr>
<th>Header</th>
<th>Required</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Authorization</code></td>
<td>Yes</td>
<td>Bearer token</td>
<td><code v-pre>Bearer eyJhbGci...</code></td>
</tr>
</tbody>
</table>
<h4 id="request-body-2" tabindex="-1"><a class="header-anchor" href="#request-body-2"><span>Request Body</span></a></h4>
<p>None required</p>
<h4 id="response-success-2" tabindex="-1"><a class="header-anchor" href="#response-success-2"><span>Response (Success)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Token revoked successfully"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "revoked_at"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"2025-11-15T10:30:00.000000Z"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="response-error-2" tabindex="-1"><a class="header-anchor" href="#response-error-2"><span>Response (Error)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"MISSING_TOKEN"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Authorization token missing"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"INVALID_TOKEN"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Invalid token format"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-token-information" tabindex="-1"><a class="header-anchor" href="#_4-token-information"><span>4. Token Information</span></a></h3>
<p><strong>Endpoint:</strong> <code v-pre>GET /api/v1/auth/app-token/info</code></p>
<p>Retrieves information about the current JWT token.</p>
<h4 id="request-headers-3" tabindex="-1"><a class="header-anchor" href="#request-headers-3"><span>Request Headers</span></a></h4>
<table>
<thead>
<tr>
<th>Header</th>
<th>Required</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Authorization</code></td>
<td>Yes</td>
<td>Bearer token</td>
<td><code v-pre>Bearer eyJhbGci...</code></td>
</tr>
</tbody>
</table>
<h4 id="request-body-3" tabindex="-1"><a class="header-anchor" href="#request-body-3"><span>Request Body</span></a></h4>
<p>None required</p>
<h4 id="response-success-3" tabindex="-1"><a class="header-anchor" href="#response-success-3"><span>Response (Success)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "jti"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"550e8400-e29b-41d4-a716-446655440000"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "device_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"device-uuid-123"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scope"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"api"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "issued_at"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"2025-11-15T10:00:00.000000Z"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "expires_at"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"2025-11-15T12:00:00.000000Z"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "issued_by"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Pencilbox Quiz"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "audience"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"pencilbox-quiz-mobile"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="response-error-3" tabindex="-1"><a class="header-anchor" href="#response-error-3"><span>Response (Error)</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"NO_TOKEN_PAYLOAD"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "message"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"No token payload available"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="token-lifecycle" tabindex="-1"><a class="header-anchor" href="#token-lifecycle"><span>Token Lifecycle</span></a></h2>
<h3 id="_1-token-generation" tabindex="-1"><a class="header-anchor" href="#_1-token-generation"><span>1. Token Generation</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Client Request (HMAC Auth)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>VerifyAppSignature Middleware</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>AppTokenController::generateToken()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Create JWT Payload</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Generate JWT Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Store JTI in Redis</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Track Device (if provided)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Return Token to Client</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-token-usage" tabindex="-1"><a class="header-anchor" href="#_2-token-usage"><span>2. Token Usage</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Client Request (Bearer Token)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>VerifyAppJwt Middleware</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Validate Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Check Blacklist</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Validate Device Binding</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Attach Payload to Request</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Controller Processing</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-token-refresh" tabindex="-1"><a class="header-anchor" href="#_3-token-refresh"><span>3. Token Refresh</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Client Request (Bearer Token)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>VerifyAppJwt Middleware (optional)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>AppTokenController::refreshToken()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Decode Current Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Check Blacklist</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Generate New Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Blacklist Old Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Store New JTI</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Return New Token</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-token-revocation" tabindex="-1"><a class="header-anchor" href="#_4-token-revocation"><span>4. Token Revocation</span></a></h3>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Client Request (Bearer Token)</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>AppTokenController::revokeToken()</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Decode Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Blacklist Token</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Track Device</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Return Success</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2>
<p>All settings are configured in <code v-pre>config/appsecurity.php</code>:</p>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jwt'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'secret'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_APP_SECRET'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'algorithm'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'HS256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'issuer'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'APP_NAME'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Pencilbox Quiz'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'audience'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'APP_CLIENT_ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'pencilbox-quiz-mobile'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'ttl'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'JWT_TTL'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 120</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// minutes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'device'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'binding_enabled'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'DEVICE_BINDING_ENABLED'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'header_name'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'X-Device-ID'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'redis_keys'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'jti_prefix'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'app:jti:'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'blacklist_prefix'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'app:blacklist:'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="implementation-details" tabindex="-1"><a class="header-anchor" href="#implementation-details"><span>Implementation Details</span></a></h2>
<h3 id="token-generation" tabindex="-1"><a class="header-anchor" href="#token-generation"><span>Token Generation</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Generate unique JTI</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$jti</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">uuid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toString</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Create payload</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$payload</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'iss'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'appsecurity.jwt.issuer'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'aud'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'appsecurity.jwt.audience'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'iat'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">time</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'nbf'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">time</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">time</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'appsecurity.jwt.ttl'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'jti'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$jti</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'device_id'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'scope'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'api'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Generate JWT</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$token</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> JWT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">encode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$secret</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'HS256'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Store JTI in Redis</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$key</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'app:jti:'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $jti</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$ttl</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> time</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Redis</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setex</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$ttl</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'active'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token-refresh" tabindex="-1"><a class="header-anchor" href="#token-refresh"><span>Token Refresh</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Decode current token</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$currentPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> $this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">decodeJwt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$currentToken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Check if blacklisted</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">$this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">isTokenBlacklisted</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$currentPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jti'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> error_response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'TOKEN_REVOKED'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Generate new token</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newJti</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">uuid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toString</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> $this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createJwtPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newJti</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$deviceId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newToken</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> $this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">generateJwt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Blacklist old token</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">$this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">blacklistToken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$currentPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jti'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">], </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$currentPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Store new JTI</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">$this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">storeJti</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newJti</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$newPayload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="token-revocation" tabindex="-1"><a class="header-anchor" href="#token-revocation"><span>Token Revocation</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Decode token</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$payload</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> $this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">decodeJwt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$token</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Blacklist token</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$key</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'app:blacklist:'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> .</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'jti'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$ttl</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> max</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $payload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'exp'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> -</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> time</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$ttl</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ></span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Redis</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setex</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$ttl</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'revoked'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="security-features" tabindex="-1"><a class="header-anchor" href="#security-features"><span>Security Features</span></a></h2>
<h3 id="device-tracking" tabindex="-1"><a class="header-anchor" href="#device-tracking"><span>Device Tracking</span></a></h3>
<p>The controller automatically tracks device information:</p>
<ul>
<li><strong>Device Creation</strong>: Creates device record if doesn't exist</li>
<li><strong>Metadata</strong>: Stores device type, model, OS version, app version</li>
<li><strong>Last Seen</strong>: Updates last seen IP, user agent, request URI</li>
<li><strong>Block Checking</strong>: Rejects requests from blocked devices</li>
</ul>
<h3 id="security-audit-logging" tabindex="-1"><a class="header-anchor" href="#security-audit-logging"><span>Security Audit Logging</span></a></h3>
<p>All token events are logged:</p>
<ul>
<li><strong>Database</strong>: Stored in <code v-pre>security_audit_logs</code> table</li>
<li><strong>File Logs</strong>: Written to configured logging channel</li>
<li><strong>Events Logged</strong>:
<ul>
<li><code v-pre>token_generated</code> - New token created</li>
<li><code v-pre>token_refreshed</code> - Token refreshed</li>
<li><code v-pre>token_revoked</code> - Token revoked</li>
</ul>
</li>
</ul>
<h3 id="token-blacklisting" tabindex="-1"><a class="header-anchor" href="#token-blacklisting"><span>Token Blacklisting</span></a></h3>
<p>Revoked tokens are stored in Redis:</p>
<ul>
<li><strong>Key Pattern</strong>: <code v-pre>app:blacklist:{jti}</code></li>
<li><strong>TTL</strong>: Set to token expiration time</li>
<li><strong>Purpose</strong>: Prevent reuse of revoked tokens</li>
</ul>
<h3 id="jti-tracking" tabindex="-1"><a class="header-anchor" href="#jti-tracking"><span>JTI Tracking</span></a></h3>
<p>Active tokens are tracked in Redis:</p>
<ul>
<li><strong>Key Pattern</strong>: <code v-pre>app:jti:{jti}</code></li>
<li><strong>TTL</strong>: Set to token expiration time</li>
<li><strong>Purpose</strong>: Track active tokens for monitoring</li>
</ul>
<h2 id="error-handling" tabindex="-1"><a class="header-anchor" href="#error-handling"><span>Error Handling</span></a></h2>
<h3 id="common-errors" tabindex="-1"><a class="header-anchor" href="#common-errors"><span>Common Errors</span></a></h3>
<table>
<thead>
<tr>
<th>Error Code</th>
<th>HTTP Status</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>DEVICE_ID_REQUIRED</code></td>
<td>400</td>
<td>Device ID required but missing</td>
</tr>
<tr>
<td><code v-pre>MISSING_TOKEN</code></td>
<td>400</td>
<td>Authorization token missing</td>
</tr>
<tr>
<td><code v-pre>INVALID_TOKEN</code></td>
<td>401</td>
<td>Invalid or expired token</td>
</tr>
<tr>
<td><code v-pre>TOKEN_REVOKED</code></td>
<td>401</td>
<td>Token has been revoked</td>
</tr>
<tr>
<td><code v-pre>TOKEN_GENERATION_FAILED</code></td>
<td>500</td>
<td>Internal error during generation</td>
</tr>
<tr>
<td><code v-pre>TOKEN_REFRESH_FAILED</code></td>
<td>500</td>
<td>Internal error during refresh</td>
</tr>
<tr>
<td><code v-pre>TOKEN_REVOCATION_FAILED</code></td>
<td>500</td>
<td>Internal error during revocation</td>
</tr>
</tbody>
</table>
<h2 id="usage-examples" tabindex="-1"><a class="header-anchor" href="#usage-examples"><span>Usage Examples</span></a></h2>
<h3 id="generate-token-curl" tabindex="-1"><a class="header-anchor" href="#generate-token-curl"><span>Generate Token (cURL)</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> POST</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://api.example.com/api/v1/auth/app-token</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-App-Signature: a1b2c3d4..."</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-App-Nonce: 550e8400-e29b-41d4-a716-446655440000"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-App-Timestamp: 1699123456"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-App-Client-ID: pencilbox-quiz-mobile"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-Device-ID: device-uuid-123"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-Device-Type: iOS"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Content-Type: application/json"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="refresh-token-curl" tabindex="-1"><a class="header-anchor" href="#refresh-token-curl"><span>Refresh Token (cURL)</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> POST</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://api.example.com/api/v1/auth/app-token/refresh</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Authorization: Bearer eyJhbGci..."</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "X-Device-ID: device-uuid-123"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Content-Type: application/json"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="revoke-token-curl" tabindex="-1"><a class="header-anchor" href="#revoke-token-curl"><span>Revoke Token (cURL)</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> POST</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://api.example.com/api/v1/auth/app-token/revoke</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Authorization: Bearer eyJhbGci..."</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Content-Type: application/json"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-token-info-curl" tabindex="-1"><a class="header-anchor" href="#get-token-info-curl"><span>Get Token Info (cURL)</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -X</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> GET</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://api.example.com/api/v1/auth/app-token/info</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Authorization: Bearer eyJhbGci..."</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  -H</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Content-Type: application/json"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<ol>
<li><strong>Short Token TTL</strong> - Use short-lived tokens (default: 120 minutes)</li>
<li><strong>Implement Refresh</strong> - Use refresh endpoint before token expires</li>
<li><strong>Revoke on Logout</strong> - Always revoke tokens on user logout</li>
<li><strong>Device Binding</strong> - Enable device binding for enhanced security</li>
<li><strong>Monitor Token Usage</strong> - Track token generation and revocation patterns</li>
<li><strong>Rotate Secrets</strong> - Regularly rotate JWT secrets</li>
<li><strong>HTTPS Only</strong> - Never transmit tokens over unencrypted connections</li>
<li><strong>Store Securely</strong> - Store tokens securely on client (keychain/keystore)</li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="token-generation-fails" tabindex="-1"><a class="header-anchor" href="#token-generation-fails"><span>Token Generation Fails</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>HMAC signature validation fails</li>
<li>Device ID missing when required</li>
<li>Redis connection issues</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Verify HMAC signature generation</li>
<li>Include device ID if binding enabled</li>
<li>Check Redis connectivity</li>
</ul>
<h3 id="token-refresh-fails" tabindex="-1"><a class="header-anchor" href="#token-refresh-fails"><span>Token Refresh Fails</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Original token expired</li>
<li>Original token revoked</li>
<li>Secret mismatch</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Refresh before token expires</li>
<li>Don't revoke token before refresh</li>
<li>Verify JWT secret configuration</li>
</ul>
<h3 id="token-revocation-not-working" tabindex="-1"><a class="header-anchor" href="#token-revocation-not-working"><span>Token Revocation Not Working</span></a></h3>
<p><strong>Common Causes:</strong></p>
<ul>
<li>Token already expired</li>
<li>Redis connection issues</li>
<li>TTL calculation error</li>
</ul>
<p><strong>Solutions:</strong></p>
<ul>
<li>Revoke before token expires</li>
<li>Check Redis connectivity</li>
<li>Verify TTL calculation</li>
</ul>
<h2 id="related-documentation" tabindex="-1"><a class="header-anchor" href="#related-documentation"><span>Related Documentation</span></a></h2>
<ul>
<li><RouteLink to="/hmac/VerifyAppSignature.html">VerifyAppSignature.md</RouteLink> - HMAC signature verification</li>
<li><RouteLink to="/hmac/VerifyAppJwt.html">VerifyAppJwt.md</RouteLink> - JWT verification middleware</li>
<li><RouteLink to="/hmac/AppSecurity-Combined.html">AppSecurity-Combined.md</RouteLink> - Complete security system overview</li>
</ul>
<h2 id="configuration-reference" tabindex="-1"><a class="header-anchor" href="#configuration-reference"><span>Configuration Reference</span></a></h2>
<p>See <code v-pre>config/appsecurity.php</code> for all configuration options.</p>
<hr>
<p><strong>Last Updated</strong>: November 2025<br>
<strong>Controller</strong>: <code v-pre>App\Http\Controllers\Auth\AppTokenController</code><br>
<strong>Status</strong>: ✅ Production Ready</p>
</div></template>


