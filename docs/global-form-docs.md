# GlobalForm

<aside class="right-toc">
  <Toc :include-level="[2,3]" />
</aside>

A powerful, configurable form builder component for Inertia.js apps. It supports rich field types, client UX features (image previews, searchable selects), validation feedback, flexible layouts (default, grid, sections), and easy create/edit submissions.

## Features

- 🧱 Declarative fields array, minimal boilerplate
- 🖼️ Image upload with live previews and replace/remove actions
- 📝 Rich text with `QuillEditor`
- 🔎 Searchable single-select and multi-select with chips
- ✅ Switch, checkbox, radio, date picker, inputs, textarea
- 🧭 Layouts: default stack, grid columns, or multi-section
- 🔁 Create or edit mode via `method='post'|'put'`
- 🔔 Toasts on success and error via `sonner`, scroll to first error
- 🌗 Dark-mode friendly styles via your UI kit

## Installation

```bash
npm install @inertiajs/react date-fns sonner
```

Required local UI components (adjust paths to your project):
- `@/components/ui/*` primitives (button, input, label, select, switch, textarea, card, popover, checkbox, radio, calendar, command)
- `@/components/QuillEditor.jsx`
- Optional: `components/ui/icon-picker.jsx` when using `iconPicker` field

## Basic Usage

```jsx
import GlobalForm from '@/demo/GlobalForm.jsx';

export default function CreateUserPage() {
  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Full name' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'bio', label: 'Bio', type: 'textarea', rows: 4 },
  ];

  return (
    <GlobalForm
      title="Create User"
      description="Add a new user to the system"
      initialData={{}}
      fields={fields}
      submitUrl="/users"
      method="post"
      onSuccess={() => {/* navigate or refresh */}}
    />
  );
}
```

## Props

- `title: string` – Card title
- `description?: string` – Card description
- `initialData: Record<string, any>` – Initial values
- `fields: Array<Field>` – Field configuration list
- `submitUrl: string` – Inertia endpoint (absolute or relative)
- `method?: 'post'|'put'` – Submission method (default: `post`)
- `submitLabel?: string` – Submit button text (default: `Submit`)
- `cancelUrl?: string|null` – If set, cancel navigates to URL; otherwise back()
- `cancelLabel?: string` – Cancel button text (default: `Cancel`)
- `onSuccess?: () => void` – Callback after success
- `successMessage?: string` – Toast text on success
- `layout?: 'default'|'grid'|'custom'` – Global field layout (default: `default`)
- `gridCols?: 1|2|3|4` – Grid columns for `layout='grid'` (default: 1)
- `sections?: Array<Section>` – Sectioned layout definition
- `imagePreviews?: Record<string,string>` – Optional initial previews

### Field shape

Common field keys:
- `name: string` – field key
- `label: string`
- `type: 'text'|'email'|'password'|'number'|'tel'|'url'|'textarea'|'richtext'|'select'|'multiselect'|'switch'|'checkbox'|'radio'|'date'|'image'|'iconPicker'`
- `placeholder?: string`
- `required?: boolean`
- `className?: string`
- `disabled?: boolean`
- `helpText?: string`
- Type-specific keys below

## Field Types and Examples

### Text-like inputs

```jsx
{ name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'jdoe' }
{ name: 'email', label: 'Email', type: 'email', required: true }
{ name: 'website', label: 'Website', type: 'url', placeholder: 'https://...' }
{ name: 'age', label: 'Age', type: 'number', min: 1, max: 120, step: 1 }
```

### Textarea

```jsx
{ name: 'bio', label: 'Bio', type: 'textarea', rows: 5, placeholder: 'Tell us about yourself' }
```

### Rich Text (Quill)

```jsx
{ name: 'content', label: 'Content', type: 'richtext', placeholder: 'Write something...' }
```

### Select (simple)

```jsx
{ name: 'role', label: 'Role', type: 'select', required: true, options: [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
] }
```

### Select (searchable combobox)

```jsx
{ name: 'country', label: 'Country', type: 'select', searchable: true, placeholder: 'Pick a country', options: countries }
```

### Multiselect (chips + searchable)

```jsx
{ name: 'tags', label: 'Tags', type: 'multiselect', searchable: true, placeholder: 'Select tags', options: [
  { value: 'news', label: 'News' },
  { value: 'tech', label: 'Tech' },
  { value: 'lifestyle', label: 'Lifestyle' },
] }
```

### Switch / Checkbox

```jsx
{ name: 'is_active', label: 'Active', type: 'switch' }
{ name: 'agree', label: 'I agree to terms', type: 'checkbox', required: true }
```

### Radio Group

```jsx
{ name: 'priority', label: 'Priority', type: 'radio', required: true, options: [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
] }
```

### Date Picker

```jsx
{ name: 'publish_date', label: 'Publish Date', type: 'date', placeholder: 'Select a date' }
```

### Image Upload with Preview

```jsx
{ name: 'avatar', label: 'Avatar', type: 'image', accept: 'image/*', helpText: 'Max 10MB' }
```

### Icon Picker

```jsx
{ name: 'icon', label: 'Icon', type: 'iconPicker', required: false }
```

## Layouts

### Default (stack)

```jsx
<GlobalForm layout="default" fields={fields} />
```

### Grid (1–4 columns responsive)

```jsx
<GlobalForm layout="grid" gridCols={2} fields={fields} />
```

### Sections (custom)

```jsx
const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'avatar', label: 'Avatar', type: 'image' },
  { name: 'is_active', label: 'Active', type: 'switch' },
];

const sections = [
  { title: 'Profile', description: 'Basic information', fields: ['name','email','bio'] },
  { title: 'Media', description: 'User images', fields: ['avatar'] },
  { title: 'Settings', description: 'Account options', fields: ['is_active'] },
];

<GlobalForm layout="custom" sections={sections} fields={fields} />
```

## Create vs Edit

- Create: `method="post"`, `initialData` empty or defaults
- Edit: `method="put"`, `initialData` prefilled; success resets form only when not editing

```jsx
// Edit user
<GlobalForm
  title="Edit User"
  method="put"
  submitUrl={`/users/${user.id}`}
  initialData={{ name: user.name, email: user.email, avatar: user.avatar_url }}
  fields={fields}
/>
```

## Validation and Errors

- Field errors from server populate `errors` via Inertia
- First error auto-scrolled into view
- Inputs get red border and message under the field

Tip: ensure backend returns validation errors keyed by field names.

## Submission Handling

- Builds `FormData` automatically, including arrays for multiselect
- Converts relative `submitUrl` to `/submitUrl`
- Uses `post` or `put` from Inertia `useForm`
- Success: shows `sonner` toast, triggers `onSuccess`, resets if creating
- Error: shows toast and scrolls to first error

## Comprehensive Example

```jsx
import GlobalForm from '@/demo/GlobalForm.jsx';

const categoryOptions = [
  { value: 'tech', label: 'Tech' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
];

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', placeholder: 'auto-generated if empty' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 3 },
  { name: 'content', label: 'Content', type: 'richtext' },
  { name: 'category', label: 'Category', type: 'select', searchable: true, options: categoryOptions },
  { name: 'tags', label: 'Tags', type: 'multiselect', searchable: true, options: [
    { value: 'news', label: 'News' },
    { value: 'howto', label: 'How-To' },
    { value: 'opinion', label: 'Opinion' },
  ] },
  { name: 'featured', label: 'Featured', type: 'switch' },
  { name: 'status', label: 'Status', type: 'radio', required: true, options: [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
  ] },
  { name: 'publish_date', label: 'Publish Date', type: 'date' },
  { name: 'hero_image', label: 'Hero Image', type: 'image', accept: 'image/*' },
  { name: 'icon', label: 'Icon', type: 'iconPicker' },
];

const sections = [
  { title: 'Basics', description: 'Title, slug, excerpt', fields: ['title','slug','excerpt'] },
  { title: 'Content', description: 'Rich text body', fields: ['content'] },
  { title: 'Taxonomy', description: 'Category & tags', fields: ['category','tags'] },
  { title: 'Publication', description: 'Status & schedule', fields: ['status','publish_date','featured'] },
  { title: 'Media', description: 'Hero & icon', fields: ['hero_image','icon'] },
];

export default function PostFormPage({ post }) {
  const isEditing = !!post;
  return (
    <GlobalForm
      title={isEditing ? 'Edit Post' : 'Create Post'}
      description="Manage blog post content"
      initialData={post || { status: 'draft' }}
      fields={fields}
      sections={sections}
      layout="custom"
      submitUrl={isEditing ? `/posts/${post.id}` : '/posts'}
      method={isEditing ? 'put' : 'post'}
      onSuccess={() => {/* navigate or toast */}}
      successMessage="Post saved successfully!"
    />
  );
}
```

## Use Cases

- **CRUD pages**: Rapidly compose create/edit pages for any model
- **Settings panels**: Mix switches, selects, radios with grid layout
- **Content authoring**: Rich text, image, and scheduling fields
- **User onboarding**: Multi-section forms grouping profile, preferences, media

## Dependencies

- `@inertiajs/react` – form state and submission
- `date-fns` – date formatting in date picker
- `sonner` – toasts
- UI kit components from `@/components/ui/*`
- `QuillEditor` for `richtext`

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Custom Properties


