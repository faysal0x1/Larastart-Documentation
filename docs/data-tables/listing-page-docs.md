# ListingPage

A high-level page component to render resource listings with DataTable, integrated searching, sorting, pagination sync with Inertia, header actions, bulk actions, custom filters, and optional tabs.

## Features

- 🔎 Debounced search synced to URL via Inertia
- ↕️ Sorting with direction, preserved across navigation
- 📄 Pagination with proper 0-based/1-based conversion for Laravel
- 📏 Page size selector with URL sync
- 🧭 Header actions with permission-aware Create button
- 🧰 Extra DataTable buttons for export/delete selected
- 🧩 Pluggable columns and custom filters
- 🗂️ Optional tabs region
- 🌗 Dark mode-friendly classes

## Basic Usage

```jsx
import ListingPage from '@/demo/ListingPage.jsx';
import { createSerialColumn, linkColumnPresets, createDateColumn, createStatusColumn } from '@/demo/tableUtils';

const statusConfig = {
  active: { color: 'green', label: 'Active' },
  inactive: { color: 'red', label: 'Inactive' },
};

export default function UsersIndex({ title, data, filters, currentUser }) {
  const columns = [
    createSerialColumn('#'),
    linkColumnPresets.primary('name', 'Name', (u) => `/users/${u.id}`),
    createDateColumn('created_at', 'Joined', 'MMM d, yyyy'),
    createStatusColumn('status', 'Status', statusConfig),
  ];

  return (
    <ListingPage
      title={title}
      data={data}
      filters={filters}
      currentUser={currentUser}
      resourceName="Users"
      resourceRoute="users"
      columns={columns}
      createPermission="users.create"
    />
  );
}
```

## Props

- `title: string` – Page title (also used by DataTable)
- `data: { data: any[]; total: number; current_page: number }` – Laravel paginator payload
- `filters?: { search?: string; per_page?: number|string; sort_column?: string; sort_direction?: 'asc'|'desc' }`
- `currentUser?: any` – Presence controls header actions visibility
- `resourceName: string` – Human-readable resource name (used in UI strings)
- `resourceRoute?: string` – Base route name; defaults to `resourceName` kebab/plural
- `breadcrumbs?: ReactNode` – Passed to `AppLayout`
- `columns: Array<any>` – DataTable column definitions
- `createButtonText?: string` – Text for Create button (default `New`)
- `createPermission?: string` – Permission for showing Create button
- `dataTableExtraFeatures?: Record<string, any>` – Feature flags/config for extra buttons
- `extraHeaderActions?: ReactNode` – Additional header-level actions
- `customFilters?: ReactNode` – Custom filter controls area
- `tabs?: ReactNode` – Optional tabs area

## Filtering, Sorting, Pagination

- Debounced search (300ms) updates URL via `router.visit` only when values differ from server filters.
- Sorting updates `sort_column` and `sort_direction` in URL/state.
- Pagination converts 0-based index from DataTable to 1-based page for Laravel.
- Page size updates are synced (`per_page`).

These are all handled internally; pass the initial `filters` you receive from the server.

## Header Actions and Permissions

```jsx
<ListingPage
  // ...
  createPermission="posts.create"
  createButtonText="New Post"
  extraHeaderActions={<Button variant="outline">Import</Button>}
/>
```

The Create button is wrapped with a `Can` guard using `createPermission`. `extraHeaderActions` renders alongside the Create button.

## Extra Buttons (Export/Delete Selected)

```jsx
<ListingPage
  // ...
  dataTableExtraFeatures={{
    'export-selected': { routeName: 'posts.exportSelected' },
    'delete-selected': { routeName: 'posts.deleteSelected' },
  }}
/>
```

- Export posts selected in the DataTable, forwarding row ids.
- Delete selected posts and clear selection on success.

## Custom Filters and Tabs

```jsx
const customFilters = (
  <div className="flex items-center gap-2">
    <StatusFilter />
    <DateRangeFilter />
  </div>
);

const tabs = (
  <Tabs defaultValue="all">
    <TabsList>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="active">Active</TabsTrigger>
      <TabsTrigger value="archived">Archived</TabsTrigger>
    </TabsList>
  </Tabs>
);

<ListingPage
  // ...
  customFilters={customFilters}
  tabs={tabs}
/>
```

## Columns Example with tableUtils

```jsx
import { createSerialColumn, createDateColumn, createStatusColumn, linkColumnPresets, createActionsColumn } from '@/demo/tableUtils';
import ActionsDropdown from '@/components/ActionsDropdown';

const columns = [
  createSerialColumn('#'),
  linkColumnPresets.primary('title', 'Title', (p) => `/posts/${p.id}`),
  createDateColumn('published_at', 'Published'),
  createStatusColumn('status', 'Status', {
    draft: { color: 'gray', label: 'Draft' },
    published: { color: 'green', label: 'Published' },
  }),
  createActionsColumn((row) => (
    <ActionsDropdown
      item={row.original}
      actions={[
        { type: 'view', label: 'View', route: (id) => `/posts/${id}` },
        { type: 'edit', label: 'Edit', route: (id) => `/posts/${id}/edit` },
        { type: 'delete', label: 'Delete', route: (id) => `/posts/${id}`, method: 'delete' },
      ]}
    />
  )),
];
```

## End-to-End Example

```jsx
export default function PostsIndex({ title, data, filters, currentUser }) {
  return (
    <ListingPage
      title={title}
      data={data}
      filters={filters}
      currentUser={currentUser}
      resourceName="Posts"
      resourceRoute="posts"
      columns={columns}
      createPermission="posts.create"
      createButtonText="New Post"
      dataTableExtraFeatures={{
        'export-selected': { routeName: 'posts.exportSelected' },
        'delete-selected': { routeName: 'posts.deleteSelected' },
      }}
      customFilters={<StatusFilter />}
      tabs={<PostsTabs />}
    />
  );
}
```

## Use Cases

- **Admin resource listings**: users, posts, products, orders
- **Moderation queues**: search + filters + bulk actions
- **Operational dashboards**: tabs for different states with quick sorting
- **Catalog management**: page-size, sorting, and export selected

## Dependencies

- `@inertiajs/react` – navigation and visits
- `DataTable` and companion UI from your components library
- `Can` for permission checks

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties
