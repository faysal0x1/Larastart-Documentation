export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About"} }],
  ["/actions-dropdown.html", { loader: () => import(/* webpackChunkName: "actions-dropdown.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/actions-dropdown.html.js"), meta: {"title":"ActionsDropdown"} }],
  ["/can-component-docs.html", { loader: () => import(/* webpackChunkName: "can-component-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/can-component-docs.html.js"), meta: {"title":"Can"} }],
  ["/cart-module.html", { loader: () => import(/* webpackChunkName: "cart-module.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/cart-module.html.js"), meta: {"title":"Cart Module"} }],
  ["/contact.html", { loader: () => import(/* webpackChunkName: "contact.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contact.html.js"), meta: {"title":"Contact"} }],
  ["/contribute.html", { loader: () => import(/* webpackChunkName: "contribute.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contribute.html.js"), meta: {"title":"How to Contribute"} }],
  ["/data-table-docs.html", { loader: () => import(/* webpackChunkName: "data-table-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-table-docs.html.js"), meta: {"title":"DataTable"} }],
  ["/datatable-buttons-docs.html", { loader: () => import(/* webpackChunkName: "datatable-buttons-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/datatable-buttons-docs.html.js"), meta: {"title":"DataTable Extra Buttons"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/global-form-docs.html", { loader: () => import(/* webpackChunkName: "global-form-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/global-form-docs.html.js"), meta: {"title":"GlobalForm"} }],
  ["/health-monitor-module.html", { loader: () => import(/* webpackChunkName: "health-monitor-module.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/health-monitor-module.html.js"), meta: {"title":"Health Monitor Module"} }],
  ["/laravel-helpers-docs.html", { loader: () => import(/* webpackChunkName: "laravel-helpers-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/laravel-helpers-docs.html.js"), meta: {"title":"Laravel Helper Functions"} }],
  ["/listing-page-docs.html", { loader: () => import(/* webpackChunkName: "listing-page-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/listing-page-docs.html.js"), meta: {"title":"ListingPage"} }],
  ["/module-file-structure.html", { loader: () => import(/* webpackChunkName: "module-file-structure.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/module-file-structure.html.js"), meta: {"title":""} }],
  ["/project-file-structure.html", { loader: () => import(/* webpackChunkName: "project-file-structure.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/project-file-structure.html.js"), meta: {"title":""} }],
  ["/project-overview.html", { loader: () => import(/* webpackChunkName: "project-overview.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/project-overview.html.js"), meta: {"title":"Pencilbox Quiz"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/table-utils-docs.html", { loader: () => import(/* webpackChunkName: "table-utils-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/table-utils-docs.html.js"), meta: {"title":"Table Utilities (tableUtils.jsx)"} }],
  ["/utility-helpers-docs.html", { loader: () => import(/* webpackChunkName: "utility-helpers-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/utility-helpers-docs.html.js"), meta: {"title":"Utility Helper Functions"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/coupon-module.html", { loader: () => import(/* webpackChunkName: "coupon-module.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/coupon-module.html.js"), meta: {"title":"Coupon Module"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
