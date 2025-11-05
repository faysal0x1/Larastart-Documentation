# DataTable

<aside class="right-toc">
  <Toc :include-level="[2,3]" />
</aside>

A flexible table component built on TanStack Table with optional server-side mode. Supports search, sorting, pagination, column visibility toggling, export dropdown, custom filters, and tabs region.

## Features

- 🔍 Global search with optional debounce via parent
- ↕️ Sorting (client or server controlled)
- 📄 Pagination (client or server controlled)
- 📏 Page size selector integrated with parent state
- 🧱 Column visibility toggle menu
- 🧰 Export dropdown hook
- 🧩 Slots: title, actions, custom filters, tabs
- 🌗 Dark mode-friendly classes

## Installation

Assumes your project provides the referenced UI components under `@/components/*` and TanStack Table.

```bash
npm install @tanstack/react-table
```

## Quick Start (Client-side mode)

```jsx
import DataTable from '@/demo/DataTable.jsx';

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
];

export default function Demo({ items }) {
  return (
    <DataTable
      title="Items"
      data={items}
      columns={columns}
      totalItems={items.length}
    />
  );
}
```

## Server-side Mode

Pass the handlers to enable manual filtering/sorting/pagination. The component will call them when the user interacts with the UI.

```jsx
<DataTable
  title="Users"
  data={data.data}
  totalItems={data.total}
  columns={columns}
  // server-side hooks
  onPageChange={(pageIndex) => navigate({ page: pageIndex + 1 })}
  currentPage={data.current_page - 1}
  onSearch={(term) => navigate({ search: term })}
  onPageSizeChange={(size) => navigate({ per_page: size })}
  onSortChange={(column, direction) => navigate({ sort_column: column, sort_direction: direction })}
  sortColumn={filters.sort_column}
  sortDirection={filters.sort_direction}
  searchValue={filters.search}
  columnVisibility={columnVisibility}
  onColumnVisibilityChange={setColumnVisibility}
/>
```

## Props

- `data: any[]` – Row data (array)
- `columns: ColumnDef[]` – TanStack column definitions
- `totalItems?: number` – Required for server-side pagination
- `searchPlaceholder?: string` – Search input placeholder (default: `Search...`)
- `initialPageSize?: number` – Default page size (default: `10`)
- `pageSizeOptions?: number[]` – Page size menu (default: `[5,10,25,50,100]`)
- `onPageChange?: (pageIndex: number) => void` – Enable server-side pagination
- `currentPage?: number` – Zero-based page index (server mode)
- `onSearch?: (term: string) => void` – Enable server-side search
- `searchValue?: string` – Current search value (server mode)
- `onPageSizeChange?: (size: number) => void` – Server page-size hook
- `onSortChange?: (columnId: string, direction: 'asc'|'desc') => void` – Server sorting hook
- `sortColumn?: string` – Sorted column id (server mode)
- `sortDirection?: 'asc'|'desc'` – Sorted direction (server mode)
- `onExport?: (args) => void` – Export dropdown callback
- `showColumnToggle?: boolean` – Show/hide visibility menu (default: `true`)
- `title?: string` – Title on the left of the header
- `actions?: ReactNode` – Header actions on the right
- `dataTableExtraFeatures?: ReactNode` – Extra header controls (e.g., bulk actions)
- `columnVisibility?: Record<string, boolean>` – Controlled visibility map
- `onColumnVisibilityChange?: (map) => void` – Visibility change callback
- `customFilters?: ReactNode` – Area below header for custom filters
- `tabs?: { tabs: { id: string; label: string; count?: number }[]; activeTab: string; onTabChange: (id) => void }` – Optional tabs UI

## Column Visibility Menu

- Toggled via the "Columns" button in the header.
- Controlled by `columnVisibility` and `onColumnVisibilityChange` if provided; otherwise managed internally.

## Sorting

- Client mode: handled automatically by TanStack.
- Server mode: provide `onSortChange`, `sortColumn`, and `sortDirection`.

Header click behavior keeps a single active sort and toggles asc/desc.

## Search

- Client mode: filters table locally.
- Server mode: calls `onSearch` for each input change (debounce in parent recommended).

## Pagination

- Client mode: handled internally.
- Server mode: provide `onPageChange`, `currentPage`, `totalItems`, and optionally `onPageSizeChange`.

`onPageSizeChange` also resets to first page when server-side.

## Custom Filters and Tabs

Place arbitrary controls in `customFilters`, and optional tabs with counts via `tabs` prop.

```jsx
<DataTable
  // ...
  customFilters={(
    <div className="flex gap-2">
      <StatusFilter />
      <OwnerFilter />
    </div>
  )}
  tabs={{
    tabs: [
      { id: 'all', label: 'All', count: 120 },
      { id: 'active', label: 'Active', count: 80 },
    ],
    activeTab: 'all',
    onTabChange: setActiveTab,
  }}
/>
```

## Example with tableUtils Columns

```jsx
import { createSerialColumn, linkColumnPresets, createDateColumn, createStatusColumn, createActionsColumn } from '@/demo/tableUtils';
import ActionsDropdown from '@/components/ActionsDropdown';

const columns = [
  createSerialColumn('#'),
  linkColumnPresets.primary('name', 'Name', (u) => `/users/${u.id}`),
  createDateColumn('created_at', 'Created'),
  createStatusColumn('status', 'Status', {
    active: { color: 'green', label: 'Active' },
    suspended: { color: 'red', label: 'Suspended' },
  }),
  createActionsColumn((row) => (
    <ActionsDropdown
      item={row.original}
      actions={[
        { type: 'view', label: 'View', route: (id) => `/users/${id}` },
        { type: 'edit', label: 'Edit', route: (id) => `/users/${id}/edit` },
        { type: 'delete', label: 'Delete', route: (id) => `/users/${id}`, method: 'delete' },
      ]}
    />
  )),
];
```

## Styling Notes

- The component applies neutral Tailwind classes and dark-mode variants.
- It expects your UI kit components to provide consistent appearance.

## Dependencies

- `@tanstack/react-table` – core table engine
- Local UI kit: inputs, select, dropdown, table, buttons
- Optional: export dropdown component

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties

