<template><div><h1 id="actionsdropdown" tabindex="-1"><a class="header-anchor" href="#actionsdropdown"><span>ActionsDropdown</span></a></h1>
<p>A flexible and feature-rich dropdown menu component for displaying contextual actions with support for permissions, confirmation dialogs, and multiple action types.</p>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h2>
<ul>
<li>🎨 Multiple action types (view, edit, delete, custom)</li>
<li>🔐 Built-in permission handling</li>
<li>⚠️ Confirmation dialogs for destructive actions</li>
<li>🎯 Action prioritization (primary, secondary, delete)</li>
<li>🌗 Dark mode support</li>
<li>♿ Accessibility features</li>
<li>🎛️ Customizable trigger button</li>
<li>📱 Responsive design</li>
</ul>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Ensure you have the required dependencies</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> @inertiajs/react lucide-react sweetalert2</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="basic-usage" tabindex="-1"><a class="header-anchor" href="#basic-usage"><span>Basic Usage</span></a></h2>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">import</span> ActionsDropdown <span class="token keyword">from</span> <span class="token string">'@/components/ActionsDropdown'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> item <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Sample Item'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'view'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'View Details'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'edit'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Edit'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">permission</span><span class="token operator">:</span> <span class="token string">'items.update'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Delete'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">permission</span><span class="token operator">:</span> <span class="token string">'items.delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">item</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span> <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>actions<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2>
<h3 id="main-props" tabindex="-1"><a class="header-anchor" href="#main-props"><span>Main Props</span></a></h3>
<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>item</code></td>
<td><code v-pre>Object</code></td>
<td><strong>Required</strong></td>
<td>The data object being acted upon</td>
</tr>
<tr>
<td><code v-pre>actions</code></td>
<td><code v-pre>Array</code></td>
<td><code v-pre>[]</code></td>
<td>Array of action configuration objects</td>
</tr>
<tr>
<td><code v-pre>size</code></td>
<td><code v-pre>'sm' | 'default' | 'lg'</code></td>
<td><code v-pre>'default'</code></td>
<td>Size of the trigger button</td>
</tr>
<tr>
<td><code v-pre>variant</code></td>
<td><code v-pre>'ghost' | 'outline' | 'default'</code></td>
<td><code v-pre>'ghost'</code></td>
<td>Button variant style</td>
</tr>
<tr>
<td><code v-pre>align</code></td>
<td><code v-pre>'start' | 'center' | 'end'</code></td>
<td><code v-pre>'end'</code></td>
<td>Dropdown menu alignment</td>
</tr>
<tr>
<td><code v-pre>showLabel</code></td>
<td><code v-pre>Boolean</code></td>
<td><code v-pre>true</code></td>
<td>Show &quot;Actions&quot; label in dropdown</td>
</tr>
<tr>
<td><code v-pre>triggerIcon</code></td>
<td><code v-pre>Component</code></td>
<td><code v-pre>MoreHorizontal</code></td>
<td>Custom icon for trigger button</td>
</tr>
<tr>
<td><code v-pre>triggerText</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>null</code></td>
<td>Text for trigger button</td>
</tr>
<tr>
<td><code v-pre>triggerClassName</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>''</code></td>
<td>Additional CSS classes for trigger</td>
</tr>
</tbody>
</table>
<h3 id="action-object-properties" tabindex="-1"><a class="header-anchor" href="#action-object-properties"><span>Action Object Properties</span></a></h3>
<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>type</code></td>
<td><code v-pre>String</code></td>
<td>No</td>
<td>Action type: <code v-pre>'view'</code>, <code v-pre>'edit'</code>, <code v-pre>'delete'</code>, <code v-pre>'copy'</code>, etc.</td>
</tr>
<tr>
<td><code v-pre>label</code></td>
<td><code v-pre>String</code></td>
<td><strong>Yes</strong></td>
<td>Display text for the action</td>
</tr>
<tr>
<td><code v-pre>icon</code></td>
<td><code v-pre>Component</code></td>
<td>No</td>
<td>Custom icon component (auto-detected from type)</td>
</tr>
<tr>
<td><code v-pre>route</code></td>
<td><code v-pre>Function</code></td>
<td>No</td>
<td>Function returning route URL: <code v-pre>(id) =&gt; '/path'</code></td>
</tr>
<tr>
<td><code v-pre>method</code></td>
<td><code v-pre>'get' | 'post' | 'put' | 'patch' | 'delete'</code></td>
<td>No</td>
<td>HTTP method for the route</td>
</tr>
<tr>
<td><code v-pre>onClick</code></td>
<td><code v-pre>Function</code></td>
<td>No</td>
<td>Custom click handler: <code v-pre>(item) =&gt; {}</code></td>
</tr>
<tr>
<td><code v-pre>permission</code></td>
<td><code v-pre>String</code></td>
<td>No</td>
<td>Permission required to show action</td>
</tr>
<tr>
<td><code v-pre>priority</code></td>
<td><code v-pre>'primary'</code></td>
<td>No</td>
<td>Mark as primary action</td>
</tr>
<tr>
<td><code v-pre>variant</code></td>
<td><code v-pre>'default' | 'destructive' | 'secondary'</code></td>
<td>No</td>
<td>Visual variant</td>
</tr>
<tr>
<td><code v-pre>disabled</code></td>
<td><code v-pre>Boolean</code></td>
<td>No</td>
<td>Disable the action</td>
</tr>
<tr>
<td><code v-pre>description</code></td>
<td><code v-pre>String</code></td>
<td>No</td>
<td>Secondary description text</td>
</tr>
<tr>
<td><code v-pre>shortcut</code></td>
<td><code v-pre>String</code></td>
<td>No</td>
<td>Keyboard shortcut hint (display only)</td>
</tr>
<tr>
<td><code v-pre>className</code></td>
<td><code v-pre>String</code></td>
<td>No</td>
<td>Additional CSS classes</td>
</tr>
<tr>
<td><code v-pre>options</code></td>
<td><code v-pre>Object</code></td>
<td>No</td>
<td>Additional Inertia.js options</td>
</tr>
</tbody>
</table>
<h3 id="delete-action-specific-properties" tabindex="-1"><a class="header-anchor" href="#delete-action-specific-properties"><span>Delete Action Specific Properties</span></a></h3>
<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>confirmTitle</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>'Are you sure?'</code></td>
<td>Confirmation dialog title</td>
</tr>
<tr>
<td><code v-pre>confirmText</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>&quot;You won't be able to revert this action!&quot;</code></td>
<td>Confirmation dialog text</td>
</tr>
<tr>
<td><code v-pre>confirmButton</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>'Yes, delete it!'</code></td>
<td>Confirm button text</td>
</tr>
<tr>
<td><code v-pre>successMessage</code></td>
<td><code v-pre>String</code></td>
<td><code v-pre>'Item has been deleted successfully.'</code></td>
<td>Success message</td>
</tr>
</tbody>
</table>
<h2 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h2>
<h3 id="basic-actions" tabindex="-1"><a class="header-anchor" href="#basic-actions"><span>Basic Actions</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'view'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'View'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">item</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span> <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>actions<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="with-permissions" tabindex="-1"><a class="header-anchor" href="#with-permissions"><span>With Permissions</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Edit User'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">permission</span><span class="token operator">:</span> <span class="token string">'users.update'</span><span class="token punctuation">,</span> <span class="token comment">// Only shown if user has permission</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Delete User'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">permission</span><span class="token operator">:</span> <span class="token string">'users.delete'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">item</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span> <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>actions<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="custom-delete-confirmation" tabindex="-1"><a class="header-anchor" href="#custom-delete-confirmation"><span>Custom Delete Confirmation</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Delete Account'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/accounts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">confirmTitle</span><span class="token operator">:</span> <span class="token string">'Delete Account?'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">confirmText</span><span class="token operator">:</span> <span class="token string">'This will permanently delete the account and all associated data.'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">confirmButton</span><span class="token operator">:</span> <span class="token string">'Yes, Delete Account'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">successMessage</span><span class="token operator">:</span> <span class="token string">'Account deleted successfully.'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="with-custom-click-handlers" tabindex="-1"><a class="header-anchor" href="#with-custom-click-handlers"><span>With Custom Click Handlers</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Export Data'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">icon</span><span class="token operator">:</span> Download<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">exportToCSV</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Send Email'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">icon</span><span class="token operator">:</span> Mail<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">openEmailDialog</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="priority-actions" tabindex="-1"><a class="header-anchor" href="#priority-actions"><span>Priority Actions</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token string">'primary'</span><span class="token punctuation">,</span> <span class="token comment">// Shown first</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'copy'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Duplicate'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/duplicate</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token comment">// Delete actions automatically shown last</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="with-descriptions" tabindex="-1"><a class="header-anchor" href="#with-descriptions"><span>With Descriptions</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'view'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'View Details'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">'See full information'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Edit Profile'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">'Update user information'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="disabled-actions" tabindex="-1"><a class="header-anchor" href="#disabled-actions"><span>Disabled Actions</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Edit'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/edit</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">disabled</span><span class="token operator">:</span> <span class="token operator">!</span>item<span class="token punctuation">.</span>canEdit<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">description</span><span class="token operator">:</span> item<span class="token punctuation">.</span>canEdit <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token string">'Editing locked'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="custom-trigger-button" tabindex="-1"><a class="header-anchor" href="#custom-trigger-button"><span>Custom Trigger Button</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> Settings <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'lucide-react'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Icon only</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> </span>
<span class="line">  <span class="token attr-name">item</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span> </span>
<span class="line">  <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>actions<span class="token punctuation">}</span></span></span>
<span class="line">  <span class="token attr-name">triggerIcon</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Settings<span class="token punctuation">}</span></span></span>
<span class="line">  <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lg<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Text only</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> </span>
<span class="line">  <span class="token attr-name">item</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span> </span>
<span class="line">  <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>actions<span class="token punctuation">}</span></span></span>
<span class="line">  <span class="token attr-name">triggerText</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Options<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Icon + Text</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> </span>
<span class="line">  <span class="token attr-name">item</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span> </span>
<span class="line">  <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>actions<span class="token punctuation">}</span></span></span>
<span class="line">  <span class="token attr-name">triggerIcon</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Settings<span class="token punctuation">}</span></span></span>
<span class="line">  <span class="token attr-name">triggerText</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Settings<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="post-put-actions" tabindex="-1"><a class="header-anchor" href="#post-put-actions"><span>POST/PUT Actions</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Publish'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">icon</span><span class="token operator">:</span> CheckCircle<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/publish</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Archive'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">icon</span><span class="token operator">:</span> Archive<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/posts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/archive</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'put'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">archived</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="action-types" tabindex="-1"><a class="header-anchor" href="#action-types"><span>Action Types</span></a></h2>
<p>The component automatically assigns appropriate icons based on the <code v-pre>type</code> property:</p>
<table>
<thead>
<tr>
<th>Type</th>
<th>Icon</th>
<th>Use Case</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>view</code> / <code v-pre>show</code></td>
<td>Eye</td>
<td>Viewing details</td>
</tr>
<tr>
<td><code v-pre>edit</code> / <code v-pre>update</code></td>
<td>Edit</td>
<td>Editing items</td>
</tr>
<tr>
<td><code v-pre>delete</code> / <code v-pre>remove</code></td>
<td>Trash2</td>
<td>Deleting items</td>
</tr>
<tr>
<td><code v-pre>copy</code> / <code v-pre>duplicate</code></td>
<td>Copy</td>
<td>Copying/duplicating</td>
</tr>
</tbody>
</table>
<h2 id="styling" tabindex="-1"><a class="header-anchor" href="#styling"><span>Styling</span></a></h2>
<h3 id="size-variants" tabindex="-1"><a class="header-anchor" href="#size-variants"><span>Size Variants</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sm<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>      <span class="token comment">// Small (28px)</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>default<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> <span class="token comment">// Default (32px)</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>      <span class="token comment">// Large (36px)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="button-variants" tabindex="-1"><a class="header-anchor" href="#button-variants"><span>Button Variants</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">variant</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ghost<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>   <span class="token comment">// Minimal style</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">variant</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>outline<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> <span class="token comment">// With border</span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> <span class="token attr-name">variant</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>default<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> <span class="token comment">// Solid background</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="custom-styling" tabindex="-1"><a class="header-anchor" href="#custom-styling"><span>Custom Styling</span></a></h3>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ActionsDropdown</span></span> </span>
<span class="line">  <span class="token attr-name">triggerClassName</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bg-blue-500 hover:bg-blue-600<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">actions</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Custom'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">className</span><span class="token operator">:</span> <span class="token string">'text-purple-600 dark:text-purple-400'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function-variable function">onClick</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">}</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="integration-with-inertia-js" tabindex="-1"><a class="header-anchor" href="#integration-with-inertia-js"><span>Integration with Inertia.js</span></a></h2>
<p>The component uses Inertia.js router for navigation and form submissions:</p>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token comment">// GET request (navigation)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'view'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'View'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// DELETE request</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Delete'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/users/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">// POST request with data</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Approve'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/requests/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/approve</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'post'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">approved</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">preserveScroll</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="permission-system" tabindex="-1"><a class="header-anchor" href="#permission-system"><span>Permission System</span></a></h2>
<p>The component integrates with a <code v-pre>Can</code> component for permission-based rendering:</p>
<div class="language-jsx line-numbers-mode" data-highlighter="prismjs" data-ext="jsx"><pre v-pre><code class="language-jsx"><span class="line"><span class="token comment">// Action only shown if user has permission</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Delete'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token function-variable function">route</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">/items/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'delete'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">permission</span><span class="token operator">:</span> <span class="token string">'items.delete'</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dark-mode" tabindex="-1"><a class="header-anchor" href="#dark-mode"><span>Dark Mode</span></a></h2>
<p>The component automatically adapts to dark mode:</p>
<ul>
<li>Uses Tailwind's dark mode classes</li>
<li>SweetAlert2 dialogs styled for dark/light themes</li>
<li>Automatically detects <code v-pre>dark</code> class on <code v-pre>document.documentElement</code></li>
</ul>
<h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<ol>
<li><strong>Group Related Actions</strong>: Use <code v-pre>priority: 'primary'</code> for most important actions</li>
<li><strong>Always Set Permissions</strong>: Protect sensitive actions with permission checks</li>
<li><strong>Meaningful Labels</strong>: Use clear, action-oriented text</li>
<li><strong>Confirm Destructive Actions</strong>: Always use <code v-pre>type: 'delete'</code> for destructive operations</li>
<li><strong>Provide Descriptions</strong>: Add <code v-pre>description</code> for complex actions</li>
<li><strong>Handle Disabled States</strong>: Explain why an action is disabled in the description</li>
</ol>
<h2 id="accessibility" tabindex="-1"><a class="header-anchor" href="#accessibility"><span>Accessibility</span></a></h2>
<ul>
<li>Trigger button includes <code v-pre>sr-only</code> text for screen readers</li>
<li>Keyboard navigation supported</li>
<li>Focus management within dropdown</li>
<li>ARIA attributes automatically applied</li>
<li>Color contrast compliant</li>
</ul>
<h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies"><span>Dependencies</span></a></h2>
<ul>
<li><code v-pre>@inertiajs/react</code> - For routing and form handling</li>
<li><code v-pre>lucide-react</code> - For icons</li>
<li><code v-pre>sweetalert2</code> - For confirmation dialogs</li>
<li><code v-pre>@/components/ui/button</code> - Shadcn button component</li>
<li><code v-pre>@/components/ui/dropdown-menu</code> - Shadcn dropdown components</li>
<li><code v-pre>@/components/permissions/Can</code> - Permission checking component</li>
</ul>
<h2 id="browser-support" tabindex="-1"><a class="header-anchor" href="#browser-support"><span>Browser Support</span></a></h2>
<p>Works in all modern browsers that support:</p>
<ul>
<li>ES6+ JavaScript</li>
<li>CSS Grid and Flexbox</li>
<li>CSS Custom Properties</li>
</ul>
</div></template>


