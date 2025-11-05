<div align="center">

# Pencilbox Quiz

An advanced quiz platform built with Laravel 12, Inertia React, Vite, and Redis. It supports rich quiz creation and management, live participation, bundles and purchases, revenue analytics, database-driven module management, and enterprise-grade mobile API security.

</div>

## Key Features

- **Quiz management**: CRUD, questions import/duplicate, AI generation, settings, privacy
- **Live quizzes**: Live attempts via quiz code, real-time stats, pause/start controls
- **Participation**: Attempt, save answers, completion, re-attempts, results pages
- **Bundles & purchases**: Bundle catalog, cart/checkout, payment webhooks, access control
- **Revenue & orders**: Orders, order items, revenue tracking, analytics dashboards
- **Module management (DB-driven)**: Enable/disable modules, settings, dependencies, CLI/UI/API
- **Security**: HMAC + JWT mobile app security, device binding, rate limits, headers hardening
- **Notifications**: In-app notifications with read/clear endpoints
- **Roles & permissions**: `spatie/laravel-permission`
- **Realtime**: Broadcasting channels for live quiz updates (Pusher/Ably compatible)

## Tech Stack

- **Backend**: PHP 8.2+, Laravel 12, Redis (`predis/predis`), Sanctum, Socialite, Spatie Permission
- **Frontend**: Inertia + React 19, Vite 6, Tailwind CSS 4, Radix UI components
- **Build/SSR**: Vite with SSR (`resources/js/ssr.jsx`), optional Node server (`server.js`)
- **Docs & tooling**: Scramble API docs, Pest, PHPStan, Pint, Rector, Debugbar (dev)

## Directory Highlights

- `app/Modules` — DB-driven module system and providers
- `app/Services` — Core services (bundles, purchases, orders, analytics, modules, cache)
- `routes/*.php` — Route groups: web, quiz, admin, analytics, api versions
- `config/*.php` — App, db, queue, cache, broadcasting, security, modules, services
- `resources/js` — Inertia React pages and components; Vite inputs set in `vite.config.js`
- `database/` — Migrations, factories, seeders
- `projectDocumentation/` and root docs — Feature-specific guides

## Requirements

- PHP 8.2+
- Composer 2
- Node 18+ (recommended) with Bun or npm
- Database (MySQL/MariaDB/PostgreSQL/SQLite)
- Redis (for cache, rate limits, queues recommended)
- OpenSSL (HTTPS strongly recommended)

## Installation

```bash
git clone <repo>
cd Pencilbox-Quiz

composer install
cp .env.example .env
php artisan key:generate

# configure DB in .env then
php artisan migrate --graceful

# install frontend deps
npm install
# or: bun install
```

## Environment Setup

Minimal `.env` example (adjust as needed):

```dotenv
APP_NAME=Pencilbox Quiz
APP_ENV=local
APP_KEY=
APP_URL=http://localhost
APP_TIMEZONE=UTC

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pencilbox_quiz
DB_USERNAME=root
DB_PASSWORD=

CACHE_DRIVER=redis
QUEUE_CONNECTION=database
SESSION_DRIVER=redis
SESSION_LIFETIME=120
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

BROADCAST_DRIVER=pusher
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https

SANCTUM_STATEFUL_DOMAINS=localhost

MAIL_MAILER=log
MAIL_FROM_ADDRESS=no-reply@example.test
MAIL_FROM_NAME="Pencilbox Quiz"
```

If using the enterprise mobile security layer, see the dedicated variables in `README_APP_SECURITY.md`.

## Running Locally

Option A: one command (PHP server + queue listener + Vite)

```bash
composer run dev
```

Option B: separate terminals

```bash
php artisan serve
php artisan queue:listen --tries=1
npm run dev
```

SSR (optional):

```bash
composer run dev:ssr
```

Vite inputs/SSR entry are configured in `vite.config.js`.

## Building Assets

```bash
npm run build        # client
npm run build:ssr    # client + ssr
```

## Database & Seeding

```bash
php artisan migrate --graceful
php artisan db:seed            # if seeders are available for your env
```

## Queues and Scheduling

- Default queue connection: `database` (configure in `.env`)
- For shared hosting without workers, use the cron-based approach documented here:
  - `CRON_SETUP_GUIDE.md` (includes examples for `schedule:run` and job processors)

Common jobs (by feature): quiz stats/analytics updates, completion processing, leaderboard updates, badge awards, cleanup.

## Caching & Performance

- Redis-backed cache, sessions, and rate-limiting
- Route/config caching recommended in production:

```bash
php artisan config:cache
php artisan route:cache
```

Useful cache commands:

```bash
php artisan cache:clear
php artisan view:clear
php artisan route:clear
```

## Realtime/Broadcasting

- Uses Laravel broadcasting; works with Pusher or Ably
- Channels for live quiz updates (by quiz id and quiz code)
- Frontend uses `laravel-echo` and `pusher-js` (see `package.json`)

Configure `BROADCAST_DRIVER` and Pusher/Ably credentials in `.env`.

## Routes Overview

- `routes/web.php` — Landing, quizzes, bundles, dashboards, notifications, short URLs
- `routes/quiz.php` — Authenticated quiz admin, question management, participation (public), live attempts
- `routes/admin.php` — Roles/permissions, users, subjects, categories, tags, teams, collections, security audit, leaderboards, admin utilities
- `routes/api.php` — API base with versioned routing; security headers middleware; Sanctum user endpoint
- Additional groups: `analytics.php`, `bundles.php`, `settings.php`, `web-api.php`, `module-management.php`

## Module Management (Database)

Enable/disable and configure modules via DB, CLI, API, or UI.

CLI examples:

```bash
php artisan module:manage list
php artisan module:manage enable coupon
php artisan module:manage disable coupon
php artisan module:manage sync
php artisan module:manage clear-cache
```

See `DATABASE_MODULE_MANAGEMENT.md` for schema, env flags, and API.

## Bundles, Purchases, Orders, Revenue

- Bundles: catalog, purchase flow, access control, analytics
- Purchase system: single quiz, bundle, subscriptions, coupons, webhooks
- Orders & revenue tracking: full order lifecycle, dashboards, exports, forecasting

Docs:

- `QUIZ_BUNDLES_FEATURE.md`
- `PURCHASE_SYSTEM_DOCUMENTATION.md`
- `REVENUE_TRACKING_DOCUMENTATION.md`

## Security

- App hardening and headers: see `config/appsecurity.php`
- Enterprise mobile API security (HMAC + JWT, device binding, rate limit):
  - `README_APP_SECURITY.md` (env, flows, commands, monitoring)

## Testing & QA

```bash
php artisan test
npm run lint
npm run format:check
```

Security test filters and load-testing examples are provided in `README_APP_SECURITY.md`.

## Deployment Checklist

- SSL configured; app served via HTTPS
- `.env` set for production (DB, Redis, queue, cache, broadcasting, mail)
- `php artisan migrate --force`
- `npm run build` (and SSR if used)
- `php artisan config:cache && php artisan route:cache`
- Queue worker or cron configured (see `CRON_SETUP_GUIDE.md`)
- Monitoring/logging/alerts enabled

## Useful Artisan Commands

```bash
# Cache management (examples)
php artisan cache:manage stats
php artisan cache:manage clear
php artisan cache:manage clear-quiz --quiz-id=123
php artisan cache:manage clear-all

# Module management (DB-driven)
php artisan module:manage list
php artisan module:manage enable coupon
php artisan module:manage disable coupon
php artisan module:manage sync
php artisan module:manage clear-cache
```

## References & Internal Docs

- App Security: `README_APP_SECURITY.md`
- Cron guide: `CRON_SETUP_GUIDE.md`
- Bundles: `QUIZ_BUNDLES_FEATURE.md`
- Purchases: `PURCHASE_SYSTEM_DOCUMENTATION.md`
- Revenue: `REVENUE_TRACKING_DOCUMENTATION.md`
- Database-driven modules: `DATABASE_MODULE_MANAGEMENT.md`
- Live API Usage: `LIVE_API_USAGE_GUIDE.md`

## License

This project is provided under the terms specified in the repository. Review third‑party package licenses as applicable.
