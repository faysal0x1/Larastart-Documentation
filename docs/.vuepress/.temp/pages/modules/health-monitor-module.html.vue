<template><div><h1 id="health-monitor-module" tabindex="-1"><a class="header-anchor" href="#health-monitor-module"><span>Health Monitor Module</span></a></h1>
<p>A comprehensive health monitoring module for Laravel applications with Telegram and Discord notifications.</p>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h2>
<ul>
<li><strong>Real-time Health Checks</strong>: Monitor database, cache, queue, storage, memory, and disk space</li>
<li><strong>HTTP Error Monitoring</strong>: Automatically detect and alert on 404, 500, 419, and other HTTP errors</li>
<li><strong>Multi-channel Notifications</strong>: Send alerts via Telegram and Discord</li>
<li><strong>Metrics Collection</strong>: Track system performance metrics over time</li>
<li><strong>Alert Management</strong>: Configurable alert levels and cooldown periods</li>
<li><strong>Data Retention</strong>: Automatic cleanup of old data</li>
<li><strong>RESTful API</strong>: Complete API for monitoring and management</li>
<li><strong>Scheduled Tasks</strong>: Automatic health checks and cleanup</li>
</ul>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<ol>
<li>The module is automatically registered when enabled in <code v-pre>config/modules.php</code></li>
<li>Run the installation command:<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">php</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> artisan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> healthmonitor:install</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration"><span>Configuration</span></a></h2>
<p>Add the following environment variables to your <code v-pre>.env</code> file:</p>
<div class="language-env line-numbers-mode" data-highlighter="shiki" data-ext="env" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-env"><span class="line"><span># Module Configuration</span></span>
<span class="line"><span>HEALTH_MONITOR_MODULE_ENABLED=true</span></span>
<span class="line"><span>HEALTH_MONITOR_MODULE_AUTO_REGISTER=true</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Health Monitor Settings</span></span>
<span class="line"><span>HEALTH_MONITOR_ENABLED=true</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Telegram Configuration</span></span>
<span class="line"><span>HEALTH_MONITOR_TELEGRAM_ENABLED=true</span></span>
<span class="line"><span>HEALTH_MONITOR_TELEGRAM_BOT_TOKEN=your_bot_token</span></span>
<span class="line"><span>HEALTH_MONITOR_TELEGRAM_CHAT_ID=your_chat_id</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Discord Configuration</span></span>
<span class="line"><span>HEALTH_MONITOR_DISCORD_ENABLED=true</span></span>
<span class="line"><span>HEALTH_MONITOR_DISCORD_WEBHOOK_URL=your_webhook_url</span></span>
<span class="line"><span>HEALTH_MONITOR_DISCORD_USERNAME=Health Monitor</span></span>
<span class="line"><span>HEALTH_MONITOR_DISCORD_AVATAR_URL=optional_avatar_url</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Error Monitoring Configuration</span></span>
<span class="line"><span>HEALTH_MONITOR_ERROR_MONITORING_ENABLED=true</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2>
<h3 id="basic-health-check" tabindex="-1"><a class="header-anchor" href="#basic-health-check"><span>Basic Health Check</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">use</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> App\Modules\HealthMonitor\Facades\</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Perform basic health check</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$health</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">performCheck</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'basic'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Perform detailed health check</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$health</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">performCheck</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'detailed'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="send-alerts" tabindex="-1"><a class="header-anchor" href="#send-alerts"><span>Send Alerts</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Send info alert</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sendAlert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'System is running normally'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'info'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Send warning alert</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sendAlert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'High memory usage detected'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'warning'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'memory_usage'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'85%'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'threshold'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'80%'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Send critical alert</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sendAlert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Database connection failed'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'critical'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'error'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Connection timeout'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'retry_count'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-health-overview" tabindex="-1"><a class="header-anchor" href="#get-health-overview"><span>Get Health Overview</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$overview</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getHealthOverview</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Returns: overall_status, checks, summary</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-metrics" tabindex="-1"><a class="header-anchor" href="#get-metrics"><span>Get Metrics</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Get recent metrics (last 60 minutes)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$metrics</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HealthMonitor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getRecentMetrics</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Get specific metric</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$memoryUsage</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $metrics</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'memory_usage'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'latest'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">];</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="commands" tabindex="-1"><a class="header-anchor" href="#commands"><span>Commands</span></a></h2>
<ul>
<li><code v-pre>php artisan healthmonitor:install</code> - Install the module</li>
<li><code v-pre>php artisan healthmonitor:status</code> - Show module status</li>
<li><code v-pre>php artisan healthmonitor:test-notification</code> - Test notifications</li>
<li><code v-pre>php artisan healthmonitor:test-error</code> - Test error monitoring</li>
<li><code v-pre>php artisan healthmonitor:cleanup</code> - Clean up old data</li>
</ul>
<h2 id="api-endpoints" tabindex="-1"><a class="header-anchor" href="#api-endpoints"><span>API Endpoints</span></a></h2>
<ul>
<li><code v-pre>GET /api/health-monitor/status</code> - Get module status</li>
<li><code v-pre>GET /api/health-monitor/health</code> - Get current health overview</li>
<li><code v-pre>GET /api/health-monitor/metrics</code> - Get recent metrics</li>
<li><code v-pre>GET /api/health-monitor/history</code> - Get health check history</li>
<li><code v-pre>GET /api/health-monitor/alerts</code> - Get alert history</li>
<li><code v-pre>POST /api/health-monitor/test-notification</code> - Test notifications</li>
<li><code v-pre>POST /api/health-monitor/cleanup</code> - Clean up old data</li>
</ul>
<h2 id="health-checks" tabindex="-1"><a class="header-anchor" href="#health-checks"><span>Health Checks</span></a></h2>
<p>The module performs the following health checks:</p>
<h3 id="basic-checks-every-minute" tabindex="-1"><a class="header-anchor" href="#basic-checks-every-minute"><span>Basic Checks (every minute)</span></a></h3>
<ul>
<li><strong>Database</strong>: Connection and response time</li>
<li><strong>Cache</strong>: Read/write functionality</li>
<li><strong>Memory</strong>: Usage percentage</li>
<li><strong>Disk Space</strong>: Available space</li>
</ul>
<h3 id="detailed-checks-every-5-minutes" tabindex="-1"><a class="header-anchor" href="#detailed-checks-every-5-minutes"><span>Detailed Checks (every 5 minutes)</span></a></h3>
<ul>
<li><strong>Queue</strong>: Pending job count</li>
<li><strong>Storage</strong>: File system operations</li>
<li><strong>Response Time</strong>: Application performance</li>
</ul>
<h2 id="error-monitoring" tabindex="-1"><a class="header-anchor" href="#error-monitoring"><span>Error Monitoring</span></a></h2>
<p>The module automatically monitors HTTP errors and sends alerts:</p>
<h3 id="monitored-error-codes" tabindex="-1"><a class="header-anchor" href="#monitored-error-codes"><span>Monitored Error Codes</span></a></h3>
<ul>
<li><strong>404</strong>: Not Found</li>
<li><strong>500</strong>: Internal Server Error</li>
<li><strong>419</strong>: CSRF Token Mismatch</li>
<li><strong>403</strong>: Forbidden</li>
<li><strong>401</strong>: Unauthorized</li>
<li><strong>429</strong>: Too Many Requests</li>
</ul>
<h3 id="error-alert-features" tabindex="-1"><a class="header-anchor" href="#error-alert-features"><span>Error Alert Features</span></a></h3>
<ul>
<li><strong>Real-time Detection</strong>: Immediate alerts when errors occur</li>
<li><strong>Cooldown Period</strong>: Prevents spam (5 minutes by default)</li>
<li><strong>Path Exclusions</strong>: Skip monitoring specific paths</li>
<li><strong>Rich Context</strong>: Includes URL, method, user info, and request data</li>
<li><strong>Sensitive Data Protection</strong>: Automatically redacts passwords and tokens</li>
</ul>
<h2 id="alert-levels" tabindex="-1"><a class="header-anchor" href="#alert-levels"><span>Alert Levels</span></a></h2>
<ul>
<li><strong>info</strong>: General information</li>
<li><strong>warning</strong>: Potential issues</li>
<li><strong>critical</strong>: Serious problems</li>
<li><strong>emergency</strong>: System down</li>
</ul>
<h2 id="configuration-options" tabindex="-1"><a class="header-anchor" href="#configuration-options"><span>Configuration Options</span></a></h2>
<h3 id="thresholds" tabindex="-1"><a class="header-anchor" href="#thresholds"><span>Thresholds</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'thresholds'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'memory_usage'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'warning'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">80</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,    </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// percentage</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'critical'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">90</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    ],</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'disk_usage'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'warning'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">85</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,    </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// percentage</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'critical'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">95</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    ],</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'response_time'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'warning'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// milliseconds</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        'critical'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    ],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cooldown-periods" tabindex="-1"><a class="header-anchor" href="#cooldown-periods"><span>Cooldown Periods</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'cooldown'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'warning'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 5 minutes</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'critical'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 1 minute</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'emergency'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// no cooldown</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="data-retention" tabindex="-1"><a class="header-anchor" href="#data-retention"><span>Data Retention</span></a></h3>
<div class="language-php line-numbers-mode" data-highlighter="shiki" data-ext="php" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-php"><span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'retention'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'health_checks'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">30</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// days</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'health_alerts'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">90</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// days</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'health_metrics'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> => </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// days</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies"><span>Dependencies</span></a></h2>
<ul>
<li><code v-pre>guzzlehttp/guzzle</code>: HTTP client for API calls</li>
<li><code v-pre>telegram-bot/api</code>: Telegram Bot API</li>
<li><code v-pre>discord-php/discord</code>: Discord webhook integration</li>
</ul>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license"><span>License</span></a></h2>
<p>MIT License - see LICENSE file for details.</p>
</div></template>


