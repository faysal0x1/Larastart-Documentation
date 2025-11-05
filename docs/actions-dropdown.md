# ActionsDropdown

<aside class="right-toc">
  <Toc :include-level="[2,3]" />
</aside>

A flexible and feature-rich dropdown menu component for displaying contextual actions with support for permissions, confirmation dialogs, and multiple action types.

## Features

- 🎨 Multiple action types (view, edit, delete, custom)
- 🔐 Built-in permission handling
- ⚠️ Confirmation dialogs for destructive actions
- 🎯 Action prioritization (primary, secondary, delete)
- 🌗 Dark mode support
- ♿ Accessibility features
- 🎛️ Customizable trigger button
- 📱 Responsive design

## Installation

```bash
# Ensure you have the required dependencies
npm install @inertiajs/react lucide-react sweetalert2
```

## Basic Usage

```jsx
import ActionsDropdown from '@/components/ActionsDropdown';

function MyComponent() {
  const item = { id: 1, name: 'Sample Item' };
  
  const actions = [
    {
      type: 'view',
      label: 'View Details',
      route: (id) => `/items/${id}`,
    },
    {
      type: 'edit',
      label: 'Edit',
      route: (id) => `/items/${id}/edit`,
      permission: 'items.update',
    },
    {
      type: 'delete',
      label: 'Delete',
      route: (id) => `/items/${id}`,
      method: 'delete',
      permission: 'items.delete',
    },
  ];

  return <ActionsDropdown item={item} actions={actions} />;
}
```

## Props

### Main Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `item` | `Object` | **Required** | The data object being acted upon |
| `actions` | `Array` | `[]` | Array of action configuration objects |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of the trigger button |
| `variant` | `'ghost' \| 'outline' \| 'default'` | `'ghost'` | Button variant style |
| `align` | `'start' \| 'center' \| 'end'` | `'end'` | Dropdown menu alignment |
| `showLabel` | `Boolean` | `true` | Show "Actions" label in dropdown |
| `triggerIcon` | `Component` | `MoreHorizontal` | Custom icon for trigger button |
| `triggerText` | `String` | `null` | Text for trigger button |
| `triggerClassName` | `String` | `''` | Additional CSS classes for trigger |

### Action Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `String` | No | Action type: `'view'`, `'edit'`, `'delete'`, `'copy'`, etc. |
| `label` | `String` | **Yes** | Display text for the action |
| `icon` | `Component` | No | Custom icon component (auto-detected from type) |
| `route` | `Function` | No | Function returning route URL: `(id) => '/path'` |
| `method` | `'get' \| 'post' \| 'put' \| 'patch' \| 'delete'` | No | HTTP method for the route |
| `onClick` | `Function` | No | Custom click handler: `(item) => {}` |
| `permission` | `String` | No | Permission required to show action |
| `priority` | `'primary'` | No | Mark as primary action |
| `variant` | `'default' \| 'destructive' \| 'secondary'` | No | Visual variant |
| `disabled` | `Boolean` | No | Disable the action |
| `description` | `String` | No | Secondary description text |
| `shortcut` | `String` | No | Keyboard shortcut hint (display only) |
| `className` | `String` | No | Additional CSS classes |
| `options` | `Object` | No | Additional Inertia.js options |

### Delete Action Specific Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `confirmTitle` | `String` | `'Are you sure?'` | Confirmation dialog title |
| `confirmText` | `String` | `"You won't be able to revert this action!"` | Confirmation dialog text |
| `confirmButton` | `String` | `'Yes, delete it!'` | Confirm button text |
| `successMessage` | `String` | `'Item has been deleted successfully.'` | Success message |

## Examples

### Basic Actions

```jsx
const actions = [
  {
    type: 'view',
    label: 'View',
    route: (id) => `/users/${id}`,
  },
  {
    type: 'edit',
    label: 'Edit',
    route: (id) => `/users/${id}/edit`,
  },
];

<ActionsDropdown item={user} actions={actions} />
```

### With Permissions

```jsx
const actions = [
  {
    type: 'edit',
    label: 'Edit User',
    route: (id) => `/users/${id}/edit`,
    permission: 'users.update', // Only shown if user has permission
  },
  {
    type: 'delete',
    label: 'Delete User',
    route: (id) => `/users/${id}`,
    method: 'delete',
    permission: 'users.delete',
  },
];

<ActionsDropdown item={user} actions={actions} />
```

### Custom Delete Confirmation

```jsx
const actions = [
  {
    type: 'delete',
    label: 'Delete Account',
    route: (id) => `/accounts/${id}`,
    method: 'delete',
    confirmTitle: 'Delete Account?',
    confirmText: 'This will permanently delete the account and all associated data.',
    confirmButton: 'Yes, Delete Account',
    successMessage: 'Account deleted successfully.',
  },
];
```

### With Custom Click Handlers

```jsx
const actions = [
  {
    label: 'Export Data',
    icon: Download,
    onClick: (item) => {
      exportToCSV(item);
    },
  },
  {
    label: 'Send Email',
    icon: Mail,
    onClick: (item) => {
      openEmailDialog(item);
    },
  },
];
```

### Priority Actions

```jsx
const actions = [
  {
    type: 'edit',
    label: 'Edit',
    route: (id) => `/items/${id}/edit`,
    priority: 'primary', // Shown first
  },
  {
    type: 'copy',
    label: 'Duplicate',
    route: (id) => `/items/${id}/duplicate`,
    method: 'post',
  },
  {
    type: 'delete',
    label: 'Delete',
    route: (id) => `/items/${id}`,
    method: 'delete',
    // Delete actions automatically shown last
  },
];
```

### With Descriptions

```jsx
const actions = [
  {
    type: 'view',
    label: 'View Details',
    description: 'See full information',
    route: (id) => `/users/${id}`,
  },
  {
    type: 'edit',
    label: 'Edit Profile',
    description: 'Update user information',
    route: (id) => `/users/${id}/edit`,
  },
];
```

### Disabled Actions

```jsx
const actions = [
  {
    type: 'edit',
    label: 'Edit',
    route: (id) => `/items/${id}/edit`,
    disabled: !item.canEdit,
    description: item.canEdit ? null : 'Editing locked',
  },
];
```

### Custom Trigger Button

```jsx
import { Settings } from 'lucide-react';

// Icon only
<ActionsDropdown 
  item={item} 
  actions={actions}
  triggerIcon={Settings}
  size="lg"
/>

// Text only
<ActionsDropdown 
  item={item} 
  actions={actions}
  triggerText="Options"
/>

// Icon + Text
<ActionsDropdown 
  item={item} 
  actions={actions}
  triggerIcon={Settings}
  triggerText="Settings"
/>
```

### POST/PUT Actions

```jsx
const actions = [
  {
    label: 'Publish',
    icon: CheckCircle,
    route: (id) => `/posts/${id}/publish`,
    method: 'post',
  },
  {
    label: 'Archive',
    icon: Archive,
    route: (id) => `/posts/${id}/archive`,
    method: 'put',
    options: {
      data: { archived: true },
    },
  },
];
```

## Action Types

The component automatically assigns appropriate icons based on the `type` property:

| Type | Icon | Use Case |
|------|------|----------|
| `view` / `show` | Eye | Viewing details |
| `edit` / `update` | Edit | Editing items |
| `delete` / `remove` | Trash2 | Deleting items |
| `copy` / `duplicate` | Copy | Copying/duplicating |

## Styling

### Size Variants

```jsx
<ActionsDropdown size="sm" />      // Small (28px)
<ActionsDropdown size="default" /> // Default (32px)
<ActionsDropdown size="lg" />      // Large (36px)
```

### Button Variants

```jsx
<ActionsDropdown variant="ghost" />   // Minimal style
<ActionsDropdown variant="outline" /> // With border
<ActionsDropdown variant="default" /> // Solid background
```

### Custom Styling

```jsx
<ActionsDropdown 
  triggerClassName="bg-blue-500 hover:bg-blue-600"
  actions={[
    {
      label: 'Custom',
      className: 'text-purple-600 dark:text-purple-400',
      onClick: () => {},
    },
  ]}
/>
```

## Integration with Inertia.js

The component uses Inertia.js router for navigation and form submissions:

```jsx
const actions = [
  // GET request (navigation)
  {
    type: 'view',
    label: 'View',
    route: (id) => `/users/${id}`,
  },
  
  // DELETE request
  {
    type: 'delete',
    label: 'Delete',
    route: (id) => `/users/${id}`,
    method: 'delete',
  },
  
  // POST request with data
  {
    label: 'Approve',
    route: (id) => `/requests/${id}/approve`,
    method: 'post',
    options: {
      data: { approved: true },
      preserveScroll: true,
    },
  },
];
```

## Permission System

The component integrates with a `Can` component for permission-based rendering:

```jsx
// Action only shown if user has permission
{
  type: 'delete',
  label: 'Delete',
  route: (id) => `/items/${id}`,
  method: 'delete',
  permission: 'items.delete',
}
```

## Dark Mode

The component automatically adapts to dark mode:
- Uses Tailwind's dark mode classes
- SweetAlert2 dialogs styled for dark/light themes
- Automatically detects `dark` class on `document.documentElement`

## Best Practices

1. **Group Related Actions**: Use `priority: 'primary'` for most important actions
2. **Always Set Permissions**: Protect sensitive actions with permission checks
3. **Meaningful Labels**: Use clear, action-oriented text
4. **Confirm Destructive Actions**: Always use `type: 'delete'` for destructive operations
5. **Provide Descriptions**: Add `description` for complex actions
6. **Handle Disabled States**: Explain why an action is disabled in the description

## Accessibility

- Trigger button includes `sr-only` text for screen readers
- Keyboard navigation supported
- Focus management within dropdown
- ARIA attributes automatically applied
- Color contrast compliant

## Dependencies

- `@inertiajs/react` - For routing and form handling
- `lucide-react` - For icons
- `sweetalert2` - For confirmation dialogs
- `@/components/ui/button` - Shadcn button component
- `@/components/ui/dropdown-menu` - Shadcn dropdown components
- `@/components/permissions/Can` - Permission checking component

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties