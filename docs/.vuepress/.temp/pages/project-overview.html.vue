<template><div><div align="center">
<h1 id="pencilbox-quiz" tabindex="-1"><a class="header-anchor" href="#pencilbox-quiz"><span>Pencilbox Quiz</span></a></h1>
<p>An advanced quiz platform built with Laravel 12, Inertia React, Vite, and Redis. It supports rich quiz creation and management, live participation, bundles and purchases, revenue analytics, database-driven module management, and enterprise-grade mobile API security.</p>
</div>
<h2 id="key-features" tabindex="-1"><a class="header-anchor" href="#key-features"><span>Key Features</span></a></h2>
<ul>
<li><strong>Quiz management</strong>: CRUD, questions import/duplicate, AI generation, settings, privacy</li>
<li><strong>Live quizzes</strong>: Live attempts via quiz code, real-time stats, pause/start controls</li>
<li><strong>Participation</strong>: Attempt, save answers, completion, re-attempts, results pages</li>
<li><strong>Bundles &amp; purchases</strong>: Bundle catalog, cart/checkout, payment webhooks, access control</li>
<li><strong>Revenue &amp; orders</strong>: Orders, order items, revenue tracking, analytics dashboards</li>
<li><strong>Module management (DB-driven)</strong>: Enable/disable modules, settings, dependencies, CLI/UI/API</li>
<li><strong>Security</strong>: HMAC + JWT mobile app security, device binding, rate limits, headers hardening</li>
<li><strong>Notifications</strong>: In-app notifications with read/clear endpoints</li>
<li><strong>Roles &amp; permissions</strong>: <code v-pre>spatie/laravel-permission</code></li>
<li><strong>Realtime</strong>: Broadcasting channels for live quiz updates (Pusher/Ably compatible)</li>
</ul>
<h2 id="tech-stack" tabindex="-1"><a class="header-anchor" href="#tech-stack"><span>Tech Stack</span></a></h2>
<ul>
<li><strong>Backend</strong>: PHP 8.2+, Laravel 12, Redis (<code v-pre>predis/predis</code>), Sanctum, Socialite, Spatie Permission</li>
<li><strong>Frontend</strong>: Inertia + React 19, Vite 6, Tailwind CSS 4, Radix UI components</li>
<li><strong>Build/SSR</strong>: Vite with SSR (<code v-pre>resources/js/ssr.jsx</code>), optional Node server (<code v-pre>server.js</code>)</li>
<li><strong>Docs &amp; tooling</strong>: Scramble API docs, Pest, PHPStan, Pint, Rector, Debugbar (dev)</li>
</ul>
<h2 id="directory-highlights" tabindex="-1"><a class="header-anchor" href="#directory-highlights"><span>Directory Highlights</span></a></h2>
<ul>
<li><code v-pre>app/Modules</code> — DB-driven module system and providers</li>
<li><code v-pre>app/Services</code> — Core services (bundles, purchases, orders, analytics, modules, cache)</li>
<li><code v-pre>routes/*.php</code> — Route groups: web, quiz, admin, analytics, api versions</li>
<li><code v-pre>config/*.php</code> — App, db, queue, cache, broadcasting, security, modules, services</li>
<li><code v-pre>resources/js</code> — Inertia React pages and components; Vite inputs set in <code v-pre>vite.config.js</code></li>
<li><code v-pre>database/</code> — Migrations, factories, seeders</li>
<li><code v-pre>projectDocumentation/</code> and root docs — Feature-specific guides</li>
</ul>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements"><span>Requirements</span></a></h2>
<ul>
<li>PHP 8.2+</li>
<li>Composer 2</li>
<li>Node 18+ (recommended) with Bun or npm</li>
<li>Database (MySQL/MariaDB/PostgreSQL/SQLite)</li>
<li>Redis (for cache, rate limits, queues recommended)</li>
<li>OpenSSL (HTTPS strongly recommended)</li>
</ul>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clone</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">rep</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">o></span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Pencilbox-Quiz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">composer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> .env.example</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> .env</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> key:generate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># configure DB in .env then</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> migrate</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --graceful</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># install frontend deps</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># or: bun install</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="environment-setup" tabindex="-1"><a class="header-anchor" href="#environment-setup"><span>Environment Setup</span></a></h2>
<p>Minimal <code v-pre>.env</code> example (adjust as needed):</p>
<div class="language-dotenv line-numbers-mode" data-highlighter="shiki" data-ext="dotenv" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-dotenv"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">APP_NAME</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Pencilbox Quiz</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">APP_ENV</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">local</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">APP_KEY</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">APP_URL</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">http://localhost</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">APP_TIMEZONE</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">UTC</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">LOG_CHANNEL</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">stack</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DB_CONNECTION</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mysql</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DB_HOST</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DB_PORT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">3306</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DB_DATABASE</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">pencilbox_quiz</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DB_USERNAME</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">root</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DB_PASSWORD</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">CACHE_DRIVER</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">redis</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">QUEUE_CONNECTION</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">database</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SESSION_DRIVER</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">redis</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SESSION_LIFETIME</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">120</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">REDIS_HOST</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">127.0.0.1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">REDIS_PORT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BROADCAST_DRIVER</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">pusher</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PUSHER_APP_ID</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PUSHER_APP_KEY</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PUSHER_APP_SECRET</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PUSHER_HOST</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PUSHER_PORT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">443</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PUSHER_SCHEME</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">https</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">SANCTUM_STATEFUL_DOMAINS</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">localhost</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">MAIL_MAILER</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">log</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">MAIL_FROM_ADDRESS</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">no-reply@example.test</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">MAIL_FROM_NAME</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Pencilbox Quiz"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If using the enterprise mobile security layer, see the dedicated variables in <code v-pre>README_APP_SECURITY.md</code>.</p>
<h2 id="running-locally" tabindex="-1"><a class="header-anchor" href="#running-locally"><span>Running Locally</span></a></h2>
<p>Option A: one command (PHP server + queue listener + Vite)</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">composer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dev</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Option B: separate terminals</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> serve</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> queue:listen</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --tries=1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dev</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SSR (optional):</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">composer</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dev:ssr</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Vite inputs/SSR entry are configured in <code v-pre>vite.config.js</code>.</p>
<h2 id="building-assets" tabindex="-1"><a class="header-anchor" href="#building-assets"><span>Building Assets</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> build</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # client</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> build:ssr</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # client + ssr</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="database-seeding" tabindex="-1"><a class="header-anchor" href="#database-seeding"><span>Database &amp; Seeding</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> migrate</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --graceful</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> db:seed</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # if seeders are available for your env</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="queues-and-scheduling" tabindex="-1"><a class="header-anchor" href="#queues-and-scheduling"><span>Queues and Scheduling</span></a></h2>
<ul>
<li>Default queue connection: <code v-pre>database</code> (configure in <code v-pre>.env</code>)</li>
<li>For shared hosting without workers, use the cron-based approach documented here:
<ul>
<li><code v-pre>CRON_SETUP_GUIDE.md</code> (includes examples for <code v-pre>schedule:run</code> and job processors)</li>
</ul>
</li>
</ul>
<p>Common jobs (by feature): quiz stats/analytics updates, completion processing, leaderboard updates, badge awards, cleanup.</p>
<h2 id="caching-performance" tabindex="-1"><a class="header-anchor" href="#caching-performance"><span>Caching &amp; Performance</span></a></h2>
<ul>
<li>Redis-backed cache, sessions, and rate-limiting</li>
<li>Route/config caching recommended in production:</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config:cache</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> route:cache</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Useful cache commands:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cache:clear</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> view:clear</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> route:clear</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="realtime-broadcasting" tabindex="-1"><a class="header-anchor" href="#realtime-broadcasting"><span>Realtime/Broadcasting</span></a></h2>
<ul>
<li>Uses Laravel broadcasting; works with Pusher or Ably</li>
<li>Channels for live quiz updates (by quiz id and quiz code)</li>
<li>Frontend uses <code v-pre>laravel-echo</code> and <code v-pre>pusher-js</code> (see <code v-pre>package.json</code>)</li>
</ul>
<p>Configure <code v-pre>BROADCAST_DRIVER</code> and Pusher/Ably credentials in <code v-pre>.env</code>.</p>
<h2 id="routes-overview" tabindex="-1"><a class="header-anchor" href="#routes-overview"><span>Routes Overview</span></a></h2>
<ul>
<li><code v-pre>routes/web.php</code> — Landing, quizzes, bundles, dashboards, notifications, short URLs</li>
<li><code v-pre>routes/quiz.php</code> — Authenticated quiz admin, question management, participation (public), live attempts</li>
<li><code v-pre>routes/admin.php</code> — Roles/permissions, users, subjects, categories, tags, teams, collections, security audit, leaderboards, admin utilities</li>
<li><code v-pre>routes/api.php</code> — API base with versioned routing; security headers middleware; Sanctum user endpoint</li>
<li>Additional groups: <code v-pre>analytics.php</code>, <code v-pre>bundles.php</code>, <code v-pre>settings.php</code>, <code v-pre>web-api.php</code>, <code v-pre>module-management.php</code></li>
</ul>
<h2 id="module-management-database" tabindex="-1"><a class="header-anchor" href="#module-management-database"><span>Module Management (Database)</span></a></h2>
<p>Enable/disable and configure modules via DB, CLI, API, or UI.</p>
<p>CLI examples:</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> list</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> coupon</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> disable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> coupon</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sync</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clear-cache</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>See <code v-pre>DATABASE_MODULE_MANAGEMENT.md</code> for schema, env flags, and API.</p>
<h2 id="bundles-purchases-orders-revenue" tabindex="-1"><a class="header-anchor" href="#bundles-purchases-orders-revenue"><span>Bundles, Purchases, Orders, Revenue</span></a></h2>
<ul>
<li>Bundles: catalog, purchase flow, access control, analytics</li>
<li>Purchase system: single quiz, bundle, subscriptions, coupons, webhooks</li>
<li>Orders &amp; revenue tracking: full order lifecycle, dashboards, exports, forecasting</li>
</ul>
<p>Docs:</p>
<ul>
<li><code v-pre>QUIZ_BUNDLES_FEATURE.md</code></li>
<li><code v-pre>PURCHASE_SYSTEM_DOCUMENTATION.md</code></li>
<li><code v-pre>REVENUE_TRACKING_DOCUMENTATION.md</code></li>
</ul>
<h2 id="security" tabindex="-1"><a class="header-anchor" href="#security"><span>Security</span></a></h2>
<ul>
<li>App hardening and headers: see <code v-pre>config/appsecurity.php</code></li>
<li>Enterprise mobile API security (HMAC + JWT, device binding, rate limit):
<ul>
<li><code v-pre>README_APP_SECURITY.md</code> (env, flows, commands, monitoring)</li>
</ul>
</li>
</ul>
<h2 id="testing-qa" tabindex="-1"><a class="header-anchor" href="#testing-qa"><span>Testing &amp; QA</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lint</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> format:check</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Security test filters and load-testing examples are provided in <code v-pre>README_APP_SECURITY.md</code>.</p>
<h2 id="deployment-checklist" tabindex="-1"><a class="header-anchor" href="#deployment-checklist"><span>Deployment Checklist</span></a></h2>
<ul>
<li>SSL configured; app served via HTTPS</li>
<li><code v-pre>.env</code> set for production (DB, Redis, queue, cache, broadcasting, mail)</li>
<li><code v-pre>php artisan migrate --force</code></li>
<li><code v-pre>npm run build</code> (and SSR if used)</li>
<li><code v-pre>php artisan config:cache &amp;&amp; php artisan route:cache</code></li>
<li>Queue worker or cron configured (see <code v-pre>CRON_SETUP_GUIDE.md</code>)</li>
<li>Monitoring/logging/alerts enabled</li>
</ul>
<h2 id="useful-artisan-commands" tabindex="-1"><a class="header-anchor" href="#useful-artisan-commands"><span>Useful Artisan Commands</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Cache management (examples)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cache:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stats</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cache:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clear</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cache:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clear-quiz</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --quiz-id=123</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cache:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clear-all</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Module management (DB-driven)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> list</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> coupon</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> disable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> coupon</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sync</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> module:manage</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clear-cache</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="references-internal-docs" tabindex="-1"><a class="header-anchor" href="#references-internal-docs"><span>References &amp; Internal Docs</span></a></h2>
<ul>
<li>App Security: <code v-pre>README_APP_SECURITY.md</code></li>
<li>Cron guide: <code v-pre>CRON_SETUP_GUIDE.md</code></li>
<li>Bundles: <code v-pre>QUIZ_BUNDLES_FEATURE.md</code></li>
<li>Purchases: <code v-pre>PURCHASE_SYSTEM_DOCUMENTATION.md</code></li>
<li>Revenue: <code v-pre>REVENUE_TRACKING_DOCUMENTATION.md</code></li>
<li>Database-driven modules: <code v-pre>DATABASE_MODULE_MANAGEMENT.md</code></li>
<li>Live API Usage: <code v-pre>LIVE_API_USAGE_GUIDE.md</code></li>
</ul>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license"><span>License</span></a></h2>
<p>This project is provided under the terms specified in the repository. Review third‑party package licenses as applicable.</p>
</div></template>


