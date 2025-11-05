# Table Utilities (tableUtils.jsx)

<aside class="right-toc">
  <Toc :include-level="[2,3]" />
</aside>

A comprehensive set of reusable helpers and small components to build powerful, consistent data tables: sortable headers, formatted cells, action menus, status badges, links, toggles with confirmation, selects with optimistic updates, images, and more.

## Features

- ✅ Quick column builders (`createColumn`, `createDateColumn`, `createStatusColumn`, etc.)
- 🧩 Composable cells: actions dropdown, links, badges, images, toggles, selects
- 🔁 Inertia integration for PATCH/POST/DELETE workflows with confirmations
- 🔐 Permission-aware actions helper
- 🎯 Strong defaults, easy overrides via options
- 🌗 Dark mode-friendly styles
- ♿ Accessible by default (focus rings, aria labels where applicable)

## Installation

```bash
# Ensure you have the required dependencies used by these utilities
npm install @inertiajs/react date-fns sweetalert2 sonner
```

These utilities also assume you have your design system components available at:
- `@/components/ui/button`, `@/components/ui/badge`, `@/components/ui/toggle-switch`, `@/components/ui/dialog`
- `@/components/ActionsDropdown` (for some action helpers)

Adjust imports in your project as needed.

## Quick Start

```jsx
import {
  createSerialColumn,
  createDateColumn,
  createStatusColumn,
  createActionsColumn,
  linkColumnPresets,
  withOriginal,
} from '@/demo/tableUtils';

const statusConfig = {
  active: { color: 'green', label: 'Active' },
  inactive: { color: 'red', label: 'Inactive' },
};

const columns = [
  createSerialColumn('#'),
  linkColumnPresets.primary('name', 'Name', (item) => `/users/${item.id}`),
  createDateColumn('created_at', 'Created', 'MMM d, yyyy'),
  createStatusColumn('status', 'Status', statusConfig),
  createActionsColumn((row) => {
    const user = row.original;
    return (
      <ActionsDropdown
        item={user}
        actions={[
          { type: 'view', label: 'View', route: (id) => `/users/${id}` },
          { type: 'edit', label: 'Edit', route: (id) => `/users/${id}/edit` },
        ]}
      />
    );
  }),
];
```

## Exports Overview

- `createColumn(key, header, cellRenderer?, canSort?, additionalProps?)`
- `createActionsColumn(actionsRenderer, header?)`
- `createDateColumn(key, header, dateFormat?)`
- `createStatusColumn(key, header, statusConfig?)`
- `createDescriptionColumn(key?, header?, wordLimit?)`
- `createTagsColumn(key, header)`
- `createBooleanColumn(key, header, booleanRenderer?)`
- `withOriginal(callback)`
- `column(accessor, headerOrRenderFn?, renderFn?)`
- `RowActions` (default export component)
- `createSerialColumn(header?)`
- `linkColumn(accessor, header, routeOrCallback, idAccessor?, options?)`
- `linkColumnPresets` { `primary`, `secondary`, `withIcon`, `external`, `truncated` }
- `createToggleColumn(key, header, routeName, options?)`
- `createStatusToggleColumn(key, header, routeName, activeValue?, inactiveValue?, options?)`
- `createPermissionActionsColumn(actions?, header?)`
- `createImageColumn(key, header, options?)`
- `createSelectColumn(key, header, routeName, options?)`

---

## API Details and Examples

### createColumn

Builds a generic column with an optional custom cell renderer and sortable header.

```jsx
createColumn(
  key: string,
  header: string | ({ column }) => ReactNode,
  cellRenderer?: (row) => ReactNode,
  canSort?: boolean = true,
  additionalProps?: object
)
```

Example:
```jsx
createColumn('email', 'Email', (row) => <span>{row.original.email}</span>)
```

### createActionsColumn

Renders a custom actions cell for each row.

```jsx
createActionsColumn(
  actionsRenderer: (row) => ReactNode,
  header?: string = 'Actions'
)
```

Example:
```jsx
createActionsColumn((row) => (
  <ActionsDropdown item={row.original} actions={[{ label: 'View', route: (id) => `/x/${id}` }]} />
))
```

### createDateColumn

Formats a date field using `date-fns`.

```jsx
createDateColumn(
  key: string,
  header: string,
  dateFormat?: string = 'MMM d, yyyy'
)
```

### createStatusColumn

Displays a colored badge based on a status map.

```jsx
createStatusColumn(
  key: string,
  header: string,
  statusConfig?: Record<string, { color: string; label?: string }>
)
```

Example:
```jsx
createStatusColumn('status', 'Status', {
  draft: { color: 'gray', label: 'Draft' },
  published: { color: 'green', label: 'Published' },
})
```

### createDescriptionColumn

Truncates long text with a dialog to expand the full content.

```jsx
createDescriptionColumn(
  key?: string = 'description',
  header?: string = 'Description',
  wordLimit?: number = 20
)
```

### createTagsColumn

Renders an array of tags as badges.

```jsx
createTagsColumn(key: string, header: string)
```

### createBooleanColumn

Simple Yes/No column or provide a custom renderer.

```jsx
createBooleanColumn(
  key: string,
  header: string,
  booleanRenderer?: (value: boolean, row) => ReactNode
)
```

### withOriginal

Utility to pass `row.original` directly to a renderer.

```jsx
withOriginal(callback: (original) => any): (row) => any
```

### column (shorthand)

Minimal column helper with optional custom cell via original item.

```jsx
column(
  accessor: string,
  headerOrRenderFn?: string | ((original) => ReactNode),
  renderFn?: (original) => ReactNode
)
```

Examples:
```jsx
column('title')
column('name', 'Customer')
column('name', (item) => <strong>{item.name}</strong>)
```

### RowActions (layout helper)

A flex container to line up row actions with configurable gap, alignment, and wrapping.

Props:
- `align`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' (default: 'start')
- `gap`: 'none' | 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' (default: 'default')
- `wrap`: boolean (default: false)
- `className`: string

Example:
```jsx
<RowActions align="end" gap="sm">
  <Button size="sm">Edit</Button>
  <Button size="sm" variant="outline">Archive</Button>
  </RowActions>
```

### createSerialColumn

Adds a 1-based index column.

```jsx
createSerialColumn(header?: string = '#')
```

### linkColumn and linkColumnPresets

Creates a link cell using Inertia `Link` with rich options.

```jsx
linkColumn(
  accessor: string,
  header: string,
  routeOrCallback: string | ((item) => string),
  idAccessor?: string = 'id',
  options?: {
    className?: string,
    linkWrapper?: string,
    textAccessor?: string | ((item) => string),
    truncate?: boolean,
    maxLength?: number,
    urlParams?: (item) => any,
    icon?: ReactNode | ((item) => ReactNode),
    iconPosition?: 'left' | 'right',
    external?: boolean,
    hoverEffect?: boolean,
    activeEffect?: boolean,
    ariaLabel?: string | ((item) => string),
    renderContent?: (item, displayText, icon) => ReactNode,
  }
)
```

Presets:
- `primary(...)`
- `secondary(...)`
- `withIcon(..., iconFn)`
- `external(...)`
- `truncated(..., maxLength?)`

Example:
```jsx
linkColumnPresets.truncated('title', 'Title', (item) => `/posts/${item.id}`, 'id', 40)
```

### createToggleColumn

Renders a toggle switch with optional confirmation and performs an Inertia `PATCH` to update a field.

```jsx
createToggleColumn(
  key: string,
  header: string,
  routeName: string, // server route name
  options?: {
    confirmMessage?: string,
    successMessage?: string,
    errorMessage?: string,
    idAccessor?: string,
    modelType?: string, // used as route param { model, id }
    disabledFn?: (original) => boolean,
    size?: 'sm' | 'default' | 'lg',
    onToggleSuccess?: (pageProps, original) => void,
    preserveScroll?: boolean,
    preserveState?: boolean,
    customPayloadFn?: (newValue: boolean, original) => any,
  }
)
```

Example:
```jsx
createToggleColumn('is_active', 'Active', 'admin.model.update', {
  modelType: 'user',
  confirmMessage: 'Change active status?',
})
```

### createStatusToggleColumn

Like `createToggleColumn` but maps booleans to numeric enumerations.

```jsx
createStatusToggleColumn(
  key: string,
  header: string,
  routeName: string,
  activeValue?: number = 1,
  inactiveValue?: number = 0,
  options?: ToggleOptions
)
```

### createPermissionActionsColumn

Filters provided actions by `auth.permissions` or `auth.roles` from `usePage().props`.

```jsx
createPermissionActionsColumn(
  actions?: Array<{
    key: string,
    label: string,
    icon?: ReactComponent,
    href?: (item) => string,
    onClick?: (item) => void,
    className?: string,
    permission?: string,
    role?: string,
  }>,
  header?: string = 'Actions'
)
```

### createImageColumn

Shows an image thumbnail with fallback and optional URL/alt transformers.

```jsx
createImageColumn(
  key: string,
  header: string,
  options?: {
    width?: number = 50,
    height?: number = 50,
    className?: string,
    defaultImage?: string,
    altTextFn?: (item) => string,
    imageUrlFn?: (item) => string,
  }
)
```

### createSelectColumn

Renders a `<select>` that updates via Inertia `PATCH`. Includes optional SweetAlert confirmation and success/error notifications.

```jsx
createSelectColumn(
  key: string,
  header: string,
  routeName: string,
  options?: {
    confirmMessage?: string,
    successMessage?: string,
    errorMessage?: string,
    idAccessor?: string,
    modelType?: string,
    disabledFn?: (original) => boolean,
    onUpdateSuccess?: (pageProps, original) => void,
    preserveScroll?: boolean,
    preserveState?: boolean,
    customPayloadFn?: (newValue, original) => any,
    selectOptions?: Array<{ value: string | number; label: string }>,
    placeholder?: string,
    showConfirmation?: boolean,
  }
)
```

Example:
```jsx
createSelectColumn('status', 'Status', 'admin.model.update', {
  modelType: 'post',
  selectOptions: [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ],
})
```

## Patterns and Tips

1. **Prefer presets**: Start with `linkColumnPresets` and override selectively.
2. **Centralize status maps**: Reuse a single `statusConfig` object across tables.
3. **Permission gating**: Use `createPermissionActionsColumn` to avoid per-row conditionals.
4. **Consistency first**: Build with `createColumn` then upgrade to specialized builders as needs evolve.
5. **Optimistic UI**: Use `preserveScroll`/`preserveState` and callbacks to keep tables snappy.

## Dependencies

- `@inertiajs/react` – Links/routing and mutations
- `date-fns` – Date formatting
- `sweetalert2` – Confirmation + notifications
- `sonner` – Toasts
- Design system primitives used from `@/components/ui/*`

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties


