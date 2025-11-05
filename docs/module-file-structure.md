```
├── 📁 Cart
│   ├── 📁 Facades
│   │   └── 🐘 CartModule.php
│   ├── 📁 Http
│   │   ├── 📁 Controllers
│   │   │   └── 🐘 CartController.php
│   │   └── 📁 Middleware
│   │       ├── 🐘 CartSessionMiddleware.php
│   │       └── 🐘 EnsureCartSession.php
│   ├── 📁 Models
│   │   ├── 🐘 Cart.php
│   │   └── 🐘 CartItem.php
│   ├── 📁 Providers
│   │   └── 🐘 CartModuleServiceProvider.php
│   ├── 📁 Services
│   │   └── 🐘 CartService.php
│   ├── 📁 database
│   │   └── 📁 migrations
│   │       ├── 🐘 2025_09_14_184047_create_carts_table.php
│   │       └── 🐘 2025_09_14_184055_create_cart_items_table.php
│   └── 📁 routes
│       └── 🐘 api.php
├── 📁 Contracts
│   └── 🐘 ModuleInterface.php
├── 📁 Coupon
│   ├── 📁 Facades
│   │   └── 🐘 Coupon.php
│   ├── 📁 Http
│   │   └── 📁 Controllers
│   │       └── 🐘 CouponController.php
│   ├── 📁 Models
│   │   ├── 🐘 Coupon.php
│   │   └── 🐘 CouponUser.php
│   ├── 📁 Providers
│   │   └── 🐘 CouponModuleServiceProvider.php
│   ├── 📁 Services
│   │   └── 🐘 CouponService.php
│   ├── 📁 database
│   │   └── 📁 migrations
│   │       ├── 🐘 2025_09_16_000010_create_coupons_table.php
│   │       └── 🐘 2025_09_16_000011_create_coupon_users_table.php
│   └── 📁 routes
│       └── 🐘 api.php
├── 📁 HealthMonitor
│   ├── 📁 Console
│   │   └── 📁 Commands
│   │       ├── 🐘 HealthMonitorCleanupCommand.php
│   │       ├── 🐘 HealthMonitorConfigCommand.php
│   │       ├── 🐘 HealthMonitorInstallCommand.php
│   │       ├── 🐘 HealthMonitorStatusCommand.php
│   │       ├── 🐘 HealthMonitorTelegramTestCommand.php
│   │       ├── 🐘 HealthMonitorTestErrorCommand.php
│   │       └── 🐘 HealthMonitorTestNotificationCommand.php
│   ├── 📁 Database
│   │   ├── 📁 Migrations
│   │   │   ├── 🐘 2025_01_15_000001_create_health_checks_table.php
│   │   │   ├── 🐘 2025_01_15_000002_create_health_alerts_table.php
│   │   │   └── 🐘 2025_01_15_000003_create_health_metrics_table.php
│   │   └── 📁 Seeders
│   │       └── 🐘 HealthMonitorSeeder.php
│   ├── 📁 Facades
│   │   └── 🐘 HealthMonitor.php
│   ├── 📁 Http
│   │   ├── 📁 Controllers
│   │   │   ├── 📁 Api
│   │   │   │   └── 🐘 HealthMonitorApiController.php
│   │   │   └── 🐘 HealthMonitorController.php
│   │   └── 📁 Middleware
│   │       └── 🐘 ErrorMonitoringMiddleware.php
│   ├── 📁 Models
│   │   ├── 🐘 HealthAlert.php
│   │   ├── 🐘 HealthCheck.php
│   │   └── 🐘 HealthMetric.php
│   ├── 📁 Providers
│   │   └── 🐘 HealthMonitorServiceProvider.php
│   ├── 📁 Resources
│   │   └── 📁 views
│   │       └── 🐘 dashboard.blade.php
│   ├── 📁 Routes
│   │   ├── 🐘 api.php
│   │   ├── 🐘 test.php
│   │   └── 🐘 web.php
│   ├── 📁 Services
│   │   ├── 🐘 DiscordNotificationService.php
│   │   ├── 🐘 HealthCheckService.php
│   │   ├── 🐘 HealthMonitorService.php
│   │   └── 🐘 TelegramNotificationService.php
│   ├── 📁 config
│   │   └── 🐘 healthmonitor.php
│   ├── 📝 README.md
│   ├── ⚙️ composer.json
│   ├── 🐘 helpers.php
│   └── 📄 install.sh
├── 📁 MyModule
│   ├── 📁 Facades
│   ├── 📁 Http
│   │   └── 📁 Controllers
│   ├── 📁 Models
│   ├── 📁 Providers
│   ├── 📁 Resources
│   │   └── 📁 views
│   ├── 📁 Services
│   ├── 📁 database
│   │   └── 📁 migrations
│   └── 📁 routes
├── 📁 Notification
│   ├── 📁 Facades
│   ├── 📁 Http
│   │   └── 📁 Controllers
│   ├── 📁 Models
│   ├── 📁 Providers
│   ├── 📁 Resources
│   │   └── 📁 views
│   ├── 📁 Services
│   ├── 📁 database
│   │   └── 📁 migrations
│   └── 📁 routes
├── 📁 PaymentGateway
│   ├── 📁 Facades
│   │   └── 🐘 PaymentGateway.php
│   ├── 📁 Http
│   │   └── 📁 Controllers
│   │       ├── 📁 Api
│   │       │   └── 🐘 PaymentController.php
│   │       ├── 📁 Web
│   │       │   └── 🐘 PaymentWebhookController.php
│   │       └── 🐘 SSLCommerzController.php
│   ├── 📁 Models
│   │   ├── 🐘 Payment.php
│   │   ├── 🐘 PaymentLog.php
│   │   └── 🐘 PaymentTransaction.php
│   ├── 📁 Providers
│   │   └── 🐘 PaymentGatewayModuleServiceProvider.php
│   ├── 📁 Services
│   │   └── 📁 SSLCommerz
│   │       └── 🐘 SSLCommerzService.php
│   ├── 📁 config
│   │   └── 🐘 payment_gateways.php
│   ├── 📁 database
│   │   └── 📁 migrations
│   │       ├── 🐘 2025_09_14_190531_update_orders_table_for_payment_integration.php
│   │       ├── 🐘 2025_09_14_190534_create_payments_table.php
│   │       ├── 🐘 2025_09_14_190535_create_payment_transactions_table.php
│   │       ├── 🐘 2025_09_15_000001_create_payment_logs_table.php
│   │       └── 🐘 2025_09_15_091051_update_payments_table_add_core_columns.php
│   └── 📁 routes
│       └── 🐘 api.php
├── 📁 SuperCache
│   ├── 📁 Console
│   │   └── 📁 Commands
│   │       ├── 🐘 SuperCacheInstallCommand.php
│   │       └── 🐘 SuperCacheStatusCommand.php
│   ├── 📁 Contracts
│   │   └── 🐘 SuperCacheInterface.php
│   ├── 📁 Database
│   │   ├── 📁 Factories
│   │   │   └── 🐘 CacheSettingFactory.php
│   │   ├── 📁 Migrations
│   │   │   └── 🐘 2025_10_08_090134_create_cache_settings_table.php
│   │   └── 📁 Seeders
│   │       └── 🐘 CacheSettingsSeeder.php
│   ├── 📁 Facades
│   │   ├── 🐘 PerformanceCache.php
│   │   └── 🐘 SimpleCache.php
│   ├── 📁 Http
│   │   └── 📁 Controllers
│   │       ├── 📁 Api
│   │       │   └── 🐘 CacheSettingsApiController.php
│   │       └── 🐘 CacheSettingsController.php
│   ├── 📁 Models
│   │   └── 🐘 CacheSetting.php
│   ├── 📁 Observers
│   │   ├── 🐘 QuizCacheObserver.php
│   │   ├── 🐘 QuizCategoryCacheObserver.php
│   │   ├── 🐘 SubjectCacheObserver.php
│   │   ├── 🐘 TagCacheObserver.php
│   │   └── 🐘 TeamCacheObserver.php
│   ├── 📁 Providers
│   │   └── 🐘 SuperCacheServiceProvider.php
│   ├── 📁 Resources
│   │   └── 📁 views
│   │       └── 📁 admin
│   │           └── 📁 cache-settings
│   │               └── 🐘 index.blade.php
│   ├── 📁 Routes
│   │   ├── 🐘 api.php
│   │   └── 🐘 web.php
│   ├── 📁 Services
│   │   ├── 🐘 CacheSettingsService.php
│   │   ├── 🐘 KeyBuilder.php
│   │   ├── 🐘 PerformanceCacheDomainService.php
│   │   ├── 🐘 PerformanceCacheManager.php
│   │   ├── 🐘 SimpleCacheManager.php
│   │   └── 🐘 SuperCacheService.php
│   ├── 📁 config
│   │   └── 🐘 supercache.php
│   ├── 📝 README.md
│   ├── 📝 SIMPLE_CACHE_GUIDE.md
│   ├── 📄 artisan
│   ├── ⚙️ composer.json
│   ├── 🐘 helpers.php
│   └── 🐘 update_controllers.php
├── 🐘 ModuleManager.php
└── 🐘 ModulesServiceProvider.php
```
