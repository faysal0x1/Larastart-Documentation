# DataTable Extra Buttons

A comprehensive set of button components for enhancing data tables with import, export, and bulk operations functionality.

## Overview

The DataTable Extra Buttons suite provides:
- 📤 **Export**: Export all data or selected rows
- 📥 **Import**: Import data from JSON, CSV, and Excel files
- 🗑️ **Bulk Delete**: Delete multiple selected rows
- 🔐 **Permission-aware**: Integrated with permission system
- 🎨 **Dark mode**: Full dark mode support
- ✨ **Drag & Drop**: File upload with drag and drop

## Components

### DataTableExtraButtons

Main wrapper component that renders configured buttons.

```jsx
import DataTableExtraButtons from '@/components/DataTables/DataTableExtraButtons';
```

### Individual Components

- `ImportButton` - File import with modal dialog
- `ExportButton` - Export all data
- `ExportSelectedButton` - Export selected rows
- `DeleteSelectedButton` - Delete selected rows

---

## Installation

```bash
# Ensure required dependencies are installed
npm install @inertiajs/react lucide-react
```

## Basic Usage

### Complete Setup

```jsx
import { useState } from 'react';
import DataTableExtraButtons from '@/components/DataTables/DataTableExtraButtons';

function UsersTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const dataTableExtraFeatures = {
    import: {
      routeName: 'users.import',
      label: 'Import Users',
    },
    export: {
      routeName: 'users.export',
      label: 'Export All',
    },
    'export-selected': {
      routeName: 'users.export-selected',
      label: 'Export Selected',
    },
    'delete-selected': {
      routeName: 'users.delete-selected',
      label: 'Delete Selected',
    },
  };

  const handleExportSelected = (rows) => {
    console.log('Exporting rows:', rows);
  };

  const handleDeleteSelected = (rows) => {
    console.log('Deleting rows:', rows);
  };

  return (
    <div>
      <DataTableExtraButtons
        dataTableExtraFeatures={dataTableExtraFeatures}
        selectedRows={selectedRows}
        onExportSelected={handleExportSelected}
        onDeleteSelected={handleDeleteSelected}
      />
      
      {/* Your data table here */}
    </div>
  );
}
```

---

## DataTableExtraButtons

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataTableExtraFeatures` | `Object` | `{}` | Configuration object for features |
| `selectedRows` | `Array` | `[]` | Array of selected row objects |
| `onExportSelected` | `Function` | `undefined` | Callback for export selected action |
| `onDeleteSelected` | `Function` | `undefined` | Callback for delete selected action |

### Feature Configuration

```javascript
{
  'import': {
    routeName: 'users.import',
    label: 'Import Users'
  },
  'export': {
    routeName: 'users.export',
    label: 'Export All'
  },
  'export-selected': {
    routeName: 'users.export-selected',
    label: 'Export Selected'
  },
  'delete-selected': {
    routeName: 'users.delete-selected',
    label: 'Delete Selected'
  }
}
```

### Examples

#### Single Feature

```jsx
const dataTableExtraFeatures = {
  export: {
    routeName: 'posts.export',
    label: 'Export Posts',
  },
};

<DataTableExtraButtons 
  dataTableExtraFeatures={dataTableExtraFeatures}
/>
```

#### Multiple Features

```jsx
const dataTableExtraFeatures = {
  import: {
    routeName: 'products.import',
    label: 'Import Products',
  },
  export: {
    routeName: 'products.export',
    label: 'Export All Products',
  },
  'export-selected': {
    routeName: 'products.export-selected',
    label: 'Export Selected',
  },
};

<DataTableExtraButtons 
  dataTableExtraFeatures={dataTableExtraFeatures}
  selectedRows={selectedRows}
/>
```

#### With Callbacks

```jsx
const handleExport = (rows) => {
  // Custom export logic
  const ids = rows.map(r => r.id);
  downloadExcel(ids);
};

const handleDelete = (rows) => {
  // Custom delete logic
  if (rows.length > 10) {
    alert('Cannot delete more than 10 items at once');
    return;
  }
  deleteItems(rows);
};

<DataTableExtraButtons 
  dataTableExtraFeatures={features}
  selectedRows={selectedRows}
  onExportSelected={handleExport}
  onDeleteSelected={handleDelete}
/>
```

---

## ImportButton

File import component with drag-and-drop support and modal dialog.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `routeName` | `string` | Route name for import endpoint |
| `label` | `string` | Button label text |
| `onImport` | `Function` | Callback after successful import |

### Callback Data

The `onImport` callback receives an object with:

```javascript
{
  success: true,
  message: 'Import successful',
  importedCount: 25,
  errors: []
}
```

### Supported File Formats

- ✅ **JSON** (`.json`)
- ✅ **CSV** (`.csv`)
- ✅ **Excel** (`.xlsx`, `.xls`)
- ❌ **SQL** (`.sql`) - Commented out in current implementation

### Examples

#### Basic Import

```jsx
<ImportButton
  routeName="users.import"
  label="Import Users"
/>
```

#### With Callback

```jsx
const handleImport = (result) => {
  if (result.success) {
    toast.success(`Imported ${result.importedCount} users!`);
    
    if (result.errors.length > 0) {
      toast.warning(`${result.errors.length} rows had errors`);
    }
  }
};

<ImportButton
  routeName="products.import"
  label="Import Products"
  onImport={handleImport}
/>
```

#### Standalone Usage

```jsx
import ImportButton from '@/components/DataTables/ImportButton';

function ImportPage() {
  return (
    <div className="p-6">
      <h1>Import Data</h1>
      <ImportButton
        routeName="data.import"
        label="Import from File"
      />
    </div>
  );
}
```

### Features

#### Drag and Drop

Users can drag files directly onto the upload area:

```jsx
// Automatically handled by component
// Visual feedback on drag enter/leave
// Validates file type on drop
```

#### File Validation

```jsx
// Automatically validates:
// - File extension
// - File type detection
// - Shows appropriate file icon
```

#### Progress Indication

```jsx
// Shows loading state during upload
// Success/error messages after completion
// Auto-closes modal on success (2s delay)
```

### Backend Implementation

```php
// routes/web.php
Route::post('/users/import', [UserController::class, 'import'])
    ->name('users.import');

// UserController.php
public function import(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:json,csv,xlsx,xls|max:10240',
    ]);
    
    $file = $request->file('file');
    $extension = $file->getClientOriginalExtension();
    
    try {
        if ($extension === 'json') {
            $data = json_decode(file_get_contents($file), true);
            // Process JSON data
        } elseif (in_array($extension, ['csv', 'xlsx', 'xls'])) {
            $data = Excel::toArray(new UsersImport, $file);
            // Process Excel/CSV data
        }
        
        $imported = 0;
        $errors = [];
        
        foreach ($data as $row) {
            try {
                User::create($row);
                $imported++;
            } catch (\Exception $e) {
                $errors[] = $e->getMessage();
            }
        }
        
        return response()->json([
            'success' => true,
            'message' => "Successfully imported {$imported} users",
            'imported_count' => $imported,
            'errors' => $errors,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 422);
    }
}
```

---

## ExportButton

Simple export button for exporting all data.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `routeName` | `string` | Route name for export endpoint |
| `label` | `string` | Button label text |

### Examples

```jsx
// Basic usage
<ExportButton
  routeName="users.export"
  label="Export All Users"
/>

// Custom label
<ExportButton
  routeName="reports.export"
  label="Download Report"
/>

// Different resources
<ExportButton
  routeName="orders.export"
  label="Export Orders"
/>
```

### Backend Implementation

```php
// routes/web.php
Route::get('/users/export', [UserController::class, 'export'])
    ->name('users.export');

// UserController.php
public function export()
{
    return Excel::download(new UsersExport, 'users.xlsx');
}

// UsersExport.php
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```

---

## ExportSelectedButton

Export only selected rows from the data table.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `routeName` | `string` | **Required** | Route name for export endpoint |
| `label` | `string` | **Required** | Button label text |
| `selectedRows` | `Array` | `[]` | Array of selected row objects |
| `onExport` | `Function` | `undefined` | Custom export handler |

### Examples

#### With Default Behavior

```jsx
<ExportSelectedButton
  routeName="users.export-selected"
  label="Export Selected"
  selectedRows={selectedRows}
/>
```

#### With Custom Handler

```jsx
const handleExport = (rows) => {
  const ids = rows.map(row => row.id);
  
  // Custom export logic
  axios.post(route('users.export-custom'), { 
    ids,
    format: 'pdf' 
  });
};

<ExportSelectedButton
  routeName="users.export-selected"
  label="Export to PDF"
  selectedRows={selectedRows}
  onExport={handleExport}
/>
```

#### With Row Count Display

```jsx
// Automatically shows count when rows selected
<ExportSelectedButton
  routeName="products.export-selected"
  label="Export"
  selectedRows={selectedRows}
/>
// Shows: "Export (5)" when 5 rows selected
```

### Features

- ✅ Shows selection count in button label
- ✅ Disabled when no rows selected
- ✅ Alert if clicked without selection
- ✅ Permission-based visibility

### Backend Implementation

```php
// routes/web.php
Route::post('/users/export-selected', [UserController::class, 'exportSelected'])
    ->name('users.export-selected');

// UserController.php
public function exportSelected(Request $request)
{
    $request->validate([
        'ids' => 'required|array',
        'ids.*' => 'exists:users,id',
    ]);
    
    $users = User::whereIn('id', $request->ids)->get();
    
    return Excel::download(
        new UsersExport($users), 
        'selected-users.xlsx'
    );
}
```

---

## DeleteSelectedButton

Bulk delete selected rows with confirmation dialog.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `routeName` | `string` | **Required** | Route name for delete endpoint |
| `label` | `string` | **Required** | Button label text |
| `selectedRows` | `Array` | `[]` | Array of selected row objects |
| `onDelete` | `Function` | `undefined` | Custom delete handler |

### Examples

#### Basic Usage

```jsx
<DeleteSelectedButton
  routeName="users.delete-selected"
  label="Delete Selected"
  selectedRows={selectedRows}
/>
```

#### With Custom Handler

```jsx
const handleDelete = (rows) => {
  const ids = rows.map(row => row.id);
  
  // Custom delete with API call
  axios.delete('/api/users/bulk', { data: { ids } })
    .then(() => {
      toast.success('Users deleted!');
      refreshTable();
    });
};

<DeleteSelectedButton
  routeName="users.delete"
  label="Remove Selected"
  selectedRows={selectedRows}
  onDelete={handleDelete}
/>
```

#### With Validation

```jsx
const handleDelete = (rows) => {
  // Check for protected users
  const protectedUsers = rows.filter(r => r.is_admin);
  
  if (protectedUsers.length > 0) {
    alert('Cannot delete admin users');
    return;
  }
  
  // Proceed with deletion
  const ids = rows.map(r => r.id);
  router.delete(route('users.destroy-multiple'), {
    data: { ids }
  });
};

<DeleteSelectedButton
  routeName="users.delete"
  label="Delete"
  selectedRows={selectedRows}
  onDelete={handleDelete}
/>
```

### Features

- ⚠️ Built-in confirmation dialog
- 🗑️ Destructive variant styling (red)
- 📊 Shows selection count
- ✅ Disabled when no selection
- 🔐 Permission-aware (users.delete)

### Confirmation Dialog

```javascript
// Default confirmation message
`Are you sure you want to delete ${selectedRows.length} selected item(s)?`
```

### Backend Implementation

```php
// routes/web.php
Route::delete('/users/delete-selected', [UserController::class, 'deleteSelected'])
    ->name('users.delete-selected')
    ->middleware('permission:users.delete');

// UserController.php
public function deleteSelected(Request $request)
{
    $request->validate([
        'ids' => 'required|array',
        'ids.*' => 'exists:users,id',
    ]);
    
    $count = User::whereIn('id', $request->ids)->delete();
    
    return redirect()->back()->with('success', "{$count} users deleted successfully");
}
```

---

## Permissions

All components integrate with the `Can` component for permission-based rendering.

### Required Permissions

| Component | Permission | Customizable |
|-----------|-----------|-------------|
| `ImportButton` | `users.import` | ❌ Hardcoded |
| `ExportButton` | `users.export` | ❌ Hardcoded |
| `ExportSelectedButton` | `users.export` | ❌ Hardcoded |
| `DeleteSelectedButton` | `users.delete` | ❌ Hardcoded |

### Current Limitation

The permissions are hardcoded to `users.*`. To use with different resources, you'll need to modify the component source code or create resource-specific versions.

### Customizing Permissions

```jsx
// Current implementation
<Can permission="users.export">
  <Button>Export</Button>
</Can>

// To make it dynamic, modify the component:
const ExportButton = ({ routeName, label, permission = 'users.export' }) => (
  <Can permission={permission}>
    <Button>Export</Button>
  </Can>
);

// Then use:
<ExportButton
  routeName="products.export"
  label="Export"
  permission="products.export"
/>
```

---

## Complete Integration Example

### React Component

```jsx
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import DataTableExtraButtons from '@/components/DataTables/DataTableExtraButtons';
import DataTable from '@/components/DataTable';

export default function UsersIndex() {
  const { users } = usePage().props;
  const [selectedRows, setSelectedRows] = useState([]);

  const dataTableExtraFeatures = {
    import: {
      routeName: 'users.import',
      label: 'Import Users',
    },
    export: {
      routeName: 'users.export',
      label: 'Export All',
    },
    'export-selected': {
      routeName: 'users.export-selected',
      label: 'Export Selected',
    },
    'delete-selected': {
      routeName: 'users.delete-selected',
      label: 'Delete Selected',
    },
  };

  const handleImport = (result) => {
    if (result.success) {
      toast.success(`Imported ${result.importedCount} users`);
    }
  };

  const handleExportSelected = (rows) => {
    console.log('Exporting:', rows);
  };

  const handleDeleteSelected = (rows) => {
    console.log('Deleting:', rows);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        
        <DataTableExtraButtons
          dataTableExtraFeatures={dataTableExtraFeatures}
          selectedRows={selectedRows}
          onExportSelected={handleExportSelected}
          onDeleteSelected={handleDeleteSelected}
        />
      </div>

      <DataTable
        data={users}
        columns={columns}
        onSelectionChange={setSelectedRows}
      />
    </div>
  );
}
```

### Laravel Routes

```php
// routes/web.php
Route::prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::post('/import', [UserController::class, 'import'])->name('import');
    Route::get('/export', [UserController::class, 'export'])->name('export');
    Route::post('/export-selected', [UserController::class, 'exportSelected'])->name('export-selected');
    Route::delete('/delete-selected', [UserController::class, 'deleteSelected'])->name('delete-selected');
});
```

### Laravel Controller

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsersExport;
use App\Imports\UsersImport;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Users/Index', [
            'users' => User::paginate(10),
        ]);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:json,csv,xlsx,xls|max:10240',
        ]);

        try {
            $import = new UsersImport();
            Excel::import($import, $request->file('file'));

            return response()->json([
                'success' => true,
                'message' => 'Users imported successfully',
                'imported_count' => $import->getRowCount(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    public function export()
    {
        return Excel::download(new UsersExport(), 'users.xlsx');
    }

    public function exportSelected(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        $users = User::whereIn('id', $request->ids)->get();
        
        return Excel::download(
            new UsersExport($users), 
            'selected-users.xlsx'
        );
    }

    public function deleteSelected(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        $count = User::whereIn('id', $request->ids)->delete();

        return redirect()->back()
            ->with('success', "{$count} users deleted successfully");
    }
}
```

---

## Styling

### Dark Mode

All components include full dark mode support:

```jsx
// Automatically applies dark mode classes
className="dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
```

### Custom Styling

```jsx
// Import button is not easily customizable
// Export buttons can use Tailwind classes

<ExportButton
  routeName="users.export"
  label="Export"
  className="bg-purple-600 hover:bg-purple-700"
/>
```

---

## Best Practices

### ✅ Do's

```jsx
// Always provide selected rows for dependent buttons
<DataTableExtraButtons
  dataTableExtraFeatures={features}
  selectedRows={selectedRows}
/>

// Use callbacks for custom logic
const handleDelete = (rows) => {
  if (rows.some(r => r.is_admin)) {
    alert('Cannot delete admins');
    return;
  }
  // Proceed...
};

// Validate file formats on backend
$request->validate([
  'file' => 'required|file|mimes:json,csv,xlsx',
]);

// Provide feedback to users
onImport={(result) => {
  toast.success(`Imported ${result.importedCount} items`);
}}
```

### ❌ Don'ts

```jsx
// Don't forget to handle empty selection
// Components handle this automatically

// Don't skip validation on backend
// Always validate file types and data

// Don't expose sensitive data in exports
// Filter columns appropriately

// Don't allow unlimited file sizes
$request->validate([
  'file' => 'max:10240', // 10MB limit
]);
```

---

## Troubleshooting

### Import Not Working

```javascript
// Check CSRF token is present
<meta name="csrf-token" content="{{ csrf_token() }}">

// Verify route exists
console.log(route('users.import'));

// Check file format is supported
// Only JSON, CSV, XLSX, XLS are supported
```

### Export Returns Empty File

```php
// Ensure data is being returned
public function export()
{
    $users = User::all();
    Log::info('Exporting users:', ['count' => $users->count()]);
    return Excel::download(new UsersExport($users), 'users.xlsx');
}
```

### Delete Not Working

```php
// Verify permission middleware
Route::delete('/users/delete-selected', [UserController::class, 'deleteSelected'])
    ->middleware('permission:users.delete');

// Check IDs are valid
$request->validate([
    'ids' => 'required|array',
    'ids.*' => 'exists:users,id',
]);
```

### Buttons Not Showing

```javascript
// Check permission system is configured
// Verify user has required permissions
console.log(usePage().props.auth.permissions);

// Ensure feature configuration is correct
const features = {
  'export': { routeName: '...', label: '...' }
};
```

---

## Dependencies

- `@inertiajs/react` - For routing and form handling
- `lucide-react` - For icons
- `@/components/ui/button` - Shadcn button component
- `@/components/permissions/Can` - Permission component
- `maatwebsite/excel` - Laravel Excel package (backend)

---

## Related Documentation

- [Can Component](/components/can) - Permission system
- [ActionsDropdown](/components/actions-dropdown) - Row-level actions