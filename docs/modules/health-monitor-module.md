# Health Monitor Module

A comprehensive health monitoring module for Laravel applications with Telegram and Discord notifications.

## Features

- **Real-time Health Checks**: Monitor database, cache, queue, storage, memory, and disk space
- **HTTP Error Monitoring**: Automatically detect and alert on 404, 500, 419, and other HTTP errors
- **Multi-channel Notifications**: Send alerts via Telegram and Discord
- **Metrics Collection**: Track system performance metrics over time
- **Alert Management**: Configurable alert levels and cooldown periods
- **Data Retention**: Automatic cleanup of old data
- **RESTful API**: Complete API for monitoring and management
- **Scheduled Tasks**: Automatic health checks and cleanup

## Installation

1. The module is automatically registered when enabled in `config/modules.php`
2. Run the installation command:
   ```bash
   php artisan healthmonitor:install
   ```

## Configuration

Add the following environment variables to your `.env` file:

```env
# Module Configuration
HEALTH_MONITOR_MODULE_ENABLED=true
HEALTH_MONITOR_MODULE_AUTO_REGISTER=true

# Health Monitor Settings
HEALTH_MONITOR_ENABLED=true

# Telegram Configuration
HEALTH_MONITOR_TELEGRAM_ENABLED=true
HEALTH_MONITOR_TELEGRAM_BOT_TOKEN=your_bot_token
HEALTH_MONITOR_TELEGRAM_CHAT_ID=your_chat_id

# Discord Configuration
HEALTH_MONITOR_DISCORD_ENABLED=true
HEALTH_MONITOR_DISCORD_WEBHOOK_URL=your_webhook_url
HEALTH_MONITOR_DISCORD_USERNAME=Health Monitor
HEALTH_MONITOR_DISCORD_AVATAR_URL=optional_avatar_url

# Error Monitoring Configuration
HEALTH_MONITOR_ERROR_MONITORING_ENABLED=true
```

## Usage

### Basic Health Check
```php
use App\Modules\HealthMonitor\Facades\HealthMonitor;

// Perform basic health check
$health = HealthMonitor::performCheck('basic');

// Perform detailed health check
$health = HealthMonitor::performCheck('detailed');
```

### Send Alerts
```php
// Send info alert
HealthMonitor::sendAlert('System is running normally', 'info');

// Send warning alert
HealthMonitor::sendAlert('High memory usage detected', 'warning', [
    'memory_usage' => '85%',
    'threshold' => '80%'
]);

// Send critical alert
HealthMonitor::sendAlert('Database connection failed', 'critical', [
    'error' => 'Connection timeout',
    'retry_count' => 3
]);
```

### Get Health Overview
```php
$overview = HealthMonitor::getHealthOverview();
// Returns: overall_status, checks, summary
```

### Get Metrics
```php
// Get recent metrics (last 60 minutes)
$metrics = HealthMonitor::getRecentMetrics(60);

// Get specific metric
$memoryUsage = $metrics['memory_usage']['latest'];
```

## Commands

- `php artisan healthmonitor:install` - Install the module
- `php artisan healthmonitor:status` - Show module status
- `php artisan healthmonitor:test-notification` - Test notifications
- `php artisan healthmonitor:test-error` - Test error monitoring
- `php artisan healthmonitor:cleanup` - Clean up old data

## API Endpoints

- `GET /api/health-monitor/status` - Get module status
- `GET /api/health-monitor/health` - Get current health overview
- `GET /api/health-monitor/metrics` - Get recent metrics
- `GET /api/health-monitor/history` - Get health check history
- `GET /api/health-monitor/alerts` - Get alert history
- `POST /api/health-monitor/test-notification` - Test notifications
- `POST /api/health-monitor/cleanup` - Clean up old data

## Health Checks

The module performs the following health checks:

### Basic Checks (every minute)
- **Database**: Connection and response time
- **Cache**: Read/write functionality
- **Memory**: Usage percentage
- **Disk Space**: Available space

### Detailed Checks (every 5 minutes)
- **Queue**: Pending job count
- **Storage**: File system operations
- **Response Time**: Application performance

## Error Monitoring

The module automatically monitors HTTP errors and sends alerts:

### Monitored Error Codes
- **404**: Not Found
- **500**: Internal Server Error
- **419**: CSRF Token Mismatch
- **403**: Forbidden
- **401**: Unauthorized
- **429**: Too Many Requests

### Error Alert Features
- **Real-time Detection**: Immediate alerts when errors occur
- **Cooldown Period**: Prevents spam (5 minutes by default)
- **Path Exclusions**: Skip monitoring specific paths
- **Rich Context**: Includes URL, method, user info, and request data
- **Sensitive Data Protection**: Automatically redacts passwords and tokens

## Alert Levels

- **info**: General information
- **warning**: Potential issues
- **critical**: Serious problems
- **emergency**: System down

## Configuration Options

### Thresholds
```php
'thresholds' => [
    'memory_usage' => [
        'warning' => 80,    // percentage
        'critical' => 90,
    ],
    'disk_usage' => [
        'warning' => 85,    // percentage
        'critical' => 95,
    ],
    'response_time' => [
        'warning' => 2000,  // milliseconds
        'critical' => 5000,
    ],
],
```

### Cooldown Periods
```php
'cooldown' => [
    'warning' => 300,   // 5 minutes
    'critical' => 60,   // 1 minute
    'emergency' => 0,   // no cooldown
],
```

### Data Retention
```php
'retention' => [
    'health_checks' => 30,  // days
    'health_alerts' => 90,  // days
    'health_metrics' => 7,  // days
],
```

## Dependencies

- `guzzlehttp/guzzle`: HTTP client for API calls
- `telegram-bot/api`: Telegram Bot API
- `discord-php/discord`: Discord webhook integration

## License

MIT License - see LICENSE file for details.
