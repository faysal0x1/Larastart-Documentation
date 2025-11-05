# Can

A React component for conditional rendering based on user permissions and roles. Integrates seamlessly with Inertia.js and Laravel's authorization system.

## Features

- 🔐 Permission-based rendering
- 👥 Role-based rendering
- 🎯 Multiple permission/role checking
- 🔄 Flexible matching strategies (any/all)
- 🚀 Simple and intuitive API
- ⚡ Zero runtime overhead
- 🔗 Integrates with Inertia.js shared data

## Installation

```bash
# Ensure you have Inertia.js React adapter installed
npm install @inertiajs/react
```

## Setup

The `Can` component requires authentication data to be shared from your Laravel backend:

```php
// app/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
            'permissions' => $request->user()?->getAllPermissions()->pluck('name') ?? [],
            'roles' => $request->user()?->getRoleNames() ?? [],
        ],
    ]);
}
```

## Basic Usage

### Single Permission

```jsx
import Can from '@/components/permissions/Can';

function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
      
      <Can permission="users.edit">
        <button>Edit Profile</button>
      </Can>
      
      <Can permission="users.delete">
        <button>Delete Account</button>
      </Can>
    </div>
  );
}
```

### Single Role

```jsx
<Can role="admin">
  <AdminPanel />
</Can>

<Can role="moderator">
  <ModeratorTools />
</Can>
```

### Without Checks (Always Show)

```jsx
// Shows content without any checks
<Can>
  <PublicContent />
</Can>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Content to conditionally render |
| `permission` | `String \| Array<String>` | `undefined` | Permission(s) required to view content |
| `role` | `String \| Array<String>` | `undefined` | Role(s) required to view content |
| `any` | `Boolean` | `false` | If true, matches ANY permission/role; if false, matches ALL |

## Examples

### Multiple Permissions (All Required)

```jsx
// User must have ALL permissions
<Can permission={['posts.create', 'posts.publish']}>
  <button>Create & Publish Post</button>
</Can>
```

### Multiple Permissions (Any Required)

```jsx
// User needs ANY of these permissions
<Can permission={['posts.edit', 'posts.moderate']} any={true}>
  <button>Manage Post</button>
</Can>
```

### Multiple Roles (All Required)

```jsx
// User must have ALL roles
<Can role={['admin', 'super-admin']}>
  <SuperAdminPanel />
</Can>
```

### Multiple Roles (Any Required)

```jsx
// User needs ANY of these roles
<Can role={['admin', 'moderator', 'editor']} any={true}>
  <button>Access Dashboard</button>
</Can>
```

### Combined Permission and Role

```jsx
// User must have BOTH the permission AND the role
<Can permission="settings.manage" role="admin">
  <AdvancedSettings />
</Can>
```

### Combined with Any Flag

```jsx
// User needs ANY permission AND ANY role
<Can 
  permission={['posts.edit', 'posts.delete']} 
  role={['admin', 'moderator']}
  any={true}
>
  <ModerationTools />
</Can>
```

### Nested Permissions

```jsx
<Can permission="dashboard.view">
  <Dashboard>
    <Can permission="analytics.view">
      <AnalyticsWidget />
    </Can>
    
    <Can permission="reports.view">
      <ReportsWidget />
    </Can>
  </Dashboard>
</Can>
```

### With Form Components

```jsx
function EditUserForm({ user }) {
  return (
    <form>
      <input name="name" defaultValue={user.name} />
      <input name="email" defaultValue={user.email} />
      
      <Can permission="users.change-role">
        <select name="role">
          <option>Admin</option>
          <option>User</option>
        </select>
      </Can>
      
      <Can permission="users.update">
        <button type="submit">Save Changes</button>
      </Can>
    </form>
  );
}
```

### With Navigation

```jsx
function Navigation() {
  return (
    <nav>
      <a href="/dashboard">Dashboard</a>
      
      <Can permission="users.view">
        <a href="/users">Users</a>
      </Can>
      
      <Can permission="posts.view">
        <a href="/posts">Posts</a>
      </Can>
      
      <Can role="admin">
        <a href="/admin">Admin Panel</a>
      </Can>
    </nav>
  );
}
```

### Conditional Actions

```jsx
function PostCard({ post }) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      
      <div className="actions">
        <Can permission="posts.edit">
          <button onClick={() => editPost(post.id)}>Edit</button>
        </Can>
        
        <Can permission="posts.delete">
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </Can>
        
        <Can permission={['posts.publish', 'posts.unpublish']} any={true}>
          <button onClick={() => togglePublish(post.id)}>
            {post.published ? 'Unpublish' : 'Publish'}
          </button>
        </Can>
      </div>
    </div>
  );
}
```

### With Table Actions

```jsx
function UserTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <Can permission={['users.edit', 'users.delete']} any={true}>
            <th>Actions</th>
          </Can>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <Can permission={['users.edit', 'users.delete']} any={true}>
              <td>
                <Can permission="users.edit">
                  <button>Edit</button>
                </Can>
                <Can permission="users.delete">
                  <button>Delete</button>
                </Can>
              </td>
            </Can>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Logic Reference

### Single Values

| Prop Configuration | Logic |
|-------------------|-------|
| `permission="posts.edit"` | User must have `posts.edit` permission |
| `role="admin"` | User must have `admin` role |
| `permission="X" role="Y"` | User must have permission X **AND** role Y |

### Array Values with `any={false}` (Default)

| Prop Configuration | Logic |
|-------------------|-------|
| `permission={['A', 'B']}` | User must have **ALL** permissions (A **AND** B) |
| `role={['admin', 'moderator']}` | User must have **ALL** roles |
| `permission={['A', 'B']} role={['X', 'Y']}` | User must have (A **AND** B) **AND** (X **AND** Y) |

### Array Values with `any={true}`

| Prop Configuration | Logic |
|-------------------|-------|
| `permission={['A', 'B']} any={true}` | User must have **ANY** permission (A **OR** B) |
| `role={['admin', 'moderator']} any={true}` | User must have **ANY** role |
| `permission={['A', 'B']} role={['X', 'Y']} any={true}` | User must have (A **OR** B) **AND** (X **OR** Y) |

## Integration with ActionsDropdown

Perfect for conditional action rendering:

```jsx
import Can from '@/components/permissions/Can';
import ActionsDropdown from '@/components/ActionsDropdown';

const actions = [
  {
    type: 'view',
    label: 'View',
    route: (id) => `/users/${id}`,
    // No permission required
  },
  {
    type: 'edit',
    label: 'Edit',
    route: (id) => `/users/${id}/edit`,
    permission: 'users.edit', // ActionsDropdown handles this
  },
  {
    type: 'delete',
    label: 'Delete',
    route: (id) => `/users/${id}`,
    method: 'delete',
    permission: 'users.delete',
  },
];

<ActionsDropdown item={user} actions={actions} />
```

Or manually wrap:

```jsx
<Can permission="users.manage">
  <ActionsDropdown item={user} actions={actions} />
</Can>
```

## Laravel Backend Setup

### Using Spatie Laravel-Permission

```php
// Install package
composer require spatie/laravel-permission

// Assign permissions
$user->givePermissionTo('posts.edit');
$user->givePermissionTo(['posts.create', 'posts.delete']);

// Assign roles
$user->assignRole('admin');

// Check in controllers
if ($user->can('posts.edit')) {
    // Allow action
}

// Check in middleware
Route::middleware(['permission:posts.edit'])->group(function () {
    // Protected routes
});
```

### Sharing Auth Data

```php
// app/Http/Middleware/HandleInertiaRequests.php
use Illuminate\Http\Request;

public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ] : null,
            'permissions' => $request->user()
                ?->getAllPermissions()
                ->pluck('name')
                ->toArray() ?? [],
            'roles' => $request->user()
                ?->getRoleNames()
                ->toArray() ?? [],
        ],
    ]);
}
```

## Permission Naming Conventions

Use consistent naming patterns for better organization:

```
// Resource-based
users.view
users.create
users.edit
users.delete

// Action-based
posts.publish
posts.unpublish
posts.moderate

// Hierarchical
dashboard.view
dashboard.analytics.view
dashboard.reports.generate

// Admin-specific
admin.settings.manage
admin.users.impersonate
```

## Best Practices

### ✅ Do's

```jsx
// Clear permission names
<Can permission="users.edit">
  <EditButton />
</Can>

// Use arrays for related permissions
<Can permission={['posts.edit', 'posts.moderate']} any={true}>
  <ModerateButton />
</Can>

// Combine with role for critical features
<Can permission="system.critical" role="super-admin">
  <DangerZone />
</Can>

// Nest for complex UIs
<Can permission="dashboard.view">
  <Dashboard>
    <Can permission="analytics.view">
      <Analytics />
    </Can>
  </Dashboard>
</Can>
```

### ❌ Don'ts

```jsx
// Don't use vague permission names
<Can permission="edit"> {/* Edit what? */}
  <EditButton />
</Can>

// Don't check authentication manually
if (auth.user) { // Can component handles this
  return <Can permission="...">...</Can>
}

// Don't mix unrelated permissions
<Can permission={['users.edit', 'posts.delete']} any={true}>
  {/* Confusing - use separate Can components */}
</Can>

// Don't nest unnecessarily
<Can permission="A">
  <Can permission="A"> {/* Redundant */}
    <Content />
  </Can>
</Can>
```

## Accessibility

The `Can` component:
- ✅ Handles null/undefined users gracefully
- ✅ Returns `null` instead of rendering empty divs
- ✅ Doesn't affect DOM structure when rendering
- ✅ Works with all React children types
- ✅ No runtime errors on missing permissions

## Performance

- **Zero Overhead**: Only renders when conditions are met
- **No Re-renders**: Doesn't subscribe to state changes
- **Efficient Checks**: Uses simple array operations
- **Small Bundle**: Minimal c