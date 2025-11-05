# Get Started

This guide helps you install and run Larastart, then shows how to use the repository pattern and JSX components.

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+ (or latest LTS)
- npm / pnpm / bun (choose one)
- MySQL or SQLite (or your preferred database)

## Installation

1) Clone the repository:

```bash
git clone https://github.com/faysal0x1/larastart.git
cd larastart
```

2) Install backend dependencies and set up environment:

```bash
composer install
cp .env.example .env
php artisan key:generate
```

3) Configure database in `.env`, then run migrations (and optionally seed):

```bash
php artisan migrate
# php artisan db:seed
```

4) Install frontend dependencies and start the dev server:

```bash
npm install
npm run dev
# or: pnpm install && pnpm dev
# or: bun install && bun run dev
```

5) Serve the application (if not using Laragon/Valet):

```bash
php artisan serve
```

## Project Structure (high level)

- `app/` domain logic, including repositories and services
- `resources/` views/assets; JSX components live under `components/ui/`
- `routes/` API and web routes
- `database/` migrations and seeders

## Repository Pattern

Larastart encourages clean separation between domain logic and data access using contracts and repository implementations.

Example contract and implementation:

```php
// app/Repositories/Contracts/UserRepository.php
namespace App\Repositories\Contracts;

interface UserRepository
{
    public function findById(int $id): ?\App\Models\User;
    public function create(array $attributes): \App\Models\User;
}
```

```php
// app/Repositories/EloquentUserRepository.php
namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepository;

class EloquentUserRepository implements UserRepository
{
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    public function create(array $attributes): User
    {
        return User::create($attributes);
    }
}
```

Bind the contract to the implementation in a service provider:

```php
// app/Providers/AppServiceProvider.php
use App\Repositories\Contracts\UserRepository as UserRepositoryContract;
use App\Repositories\EloquentUserRepository;

public function register(): void
{
    $this->app->bind(UserRepositoryContract::class, EloquentUserRepository::class);
}
```

Now inject the contract anywhere:

```php
public function __construct(private \App\Repositories\Contracts\UserRepository $users) {}
```

## JSX Components

Larastart includes custom JSX components to speed up UI development. Components live under `components/ui/` and are bundled by Vite.

Example usage (simplified):

```jsx
// components/ui/Button.jsx
export function Button({ variant = 'primary', children, ...props }) {
  const classes = variant === 'primary' ? 'btn btn-primary' : 'btn';
  return <button className={classes} {...props}>{children}</button>;
}
```

```jsx
// Example import inside your app entry
import { Button } from '@/components/ui/Button';

export default function Example() {
  return <Button>Save</Button>;
}
``;
```

## Scripts

- `npm run dev`: start Vite in development
- `npm run build`: production build
- `php artisan test`: run backend tests

## Next Steps

- Explore the repository interfaces in `app/Repositories`
- Browse UI components in `components/ui`
- Add your first domain service and wire it via a contract

## Links

- GitHub: `https://github.com/faysal0x1/larastart`
