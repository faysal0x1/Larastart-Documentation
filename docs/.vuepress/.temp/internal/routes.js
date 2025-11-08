export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/about.html", { loader: () => import(/* webpackChunkName: "about.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/about.html.js"), meta: {"title":"About"} }],
  ["/contact.html", { loader: () => import(/* webpackChunkName: "contact.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contact.html.js"), meta: {"title":"Contact"} }],
  ["/contribute.html", { loader: () => import(/* webpackChunkName: "contribute.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contribute.html.js"), meta: {"title":"How to Contribute"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/laravel-helpers-docs.html", { loader: () => import(/* webpackChunkName: "laravel-helpers-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/laravel-helpers-docs.html.js"), meta: {"title":"Laravel Helper Functions"} }],
  ["/project-overview.html", { loader: () => import(/* webpackChunkName: "project-overview.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/project-overview.html.js"), meta: {"title":"Pencilbox Quiz"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/components/actions-dropdown.html", { loader: () => import(/* webpackChunkName: "components_actions-dropdown.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/components/actions-dropdown.html.js"), meta: {"title":"ActionsDropdown"} }],
  ["/components/can-component-docs.html", { loader: () => import(/* webpackChunkName: "components_can-component-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/components/can-component-docs.html.js"), meta: {"title":"Can"} }],
  ["/components/utility-helpers-docs.html", { loader: () => import(/* webpackChunkName: "components_utility-helpers-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/components/utility-helpers-docs.html.js"), meta: {"title":"Utility Helper Functions"} }],
  ["/data-tables/data-table-docs.html", { loader: () => import(/* webpackChunkName: "data-tables_data-table-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/data-table-docs.html.js"), meta: {"title":"DataTable"} }],
  ["/data-tables/datatable-buttons-docs.html", { loader: () => import(/* webpackChunkName: "data-tables_datatable-buttons-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/datatable-buttons-docs.html.js"), meta: {"title":"DataTable Extra Buttons"} }],
  ["/data-tables/global-form-docs.html", { loader: () => import(/* webpackChunkName: "data-tables_global-form-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/global-form-docs.html.js"), meta: {"title":"GlobalForm"} }],
  ["/data-tables/listing-page-docs.html", { loader: () => import(/* webpackChunkName: "data-tables_listing-page-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/listing-page-docs.html.js"), meta: {"title":"ListingPage"} }],
  ["/data-tables/table-utils-docs.html", { loader: () => import(/* webpackChunkName: "data-tables_table-utils-docs.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/table-utils-docs.html.js"), meta: {"title":"Table Utilities (tableUtils.jsx)"} }],
  ["/hmac/AppSecurity-Combined.html", { loader: () => import(/* webpackChunkName: "hmac_AppSecurity-Combined.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/hmac/AppSecurity-Combined.html.js"), meta: {"title":"App Security System - Combined Documentation"} }],
  ["/hmac/AppTokenController.html", { loader: () => import(/* webpackChunkName: "hmac_AppTokenController.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/hmac/AppTokenController.html.js"), meta: {"title":"AppTokenController Documentation"} }],
  ["/hmac/VerifyAppJwt.html", { loader: () => import(/* webpackChunkName: "hmac_VerifyAppJwt.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/hmac/VerifyAppJwt.html.js"), meta: {"title":"VerifyAppJwt Middleware Documentation"} }],
  ["/hmac/VerifyAppSignature.html", { loader: () => import(/* webpackChunkName: "hmac_VerifyAppSignature.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/hmac/VerifyAppSignature.html.js"), meta: {"title":"VerifyAppSignature Middleware Documentation"} }],
  ["/structure/module-file-structure.html", { loader: () => import(/* webpackChunkName: "structure_module-file-structure.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/structure/module-file-structure.html.js"), meta: {"title":""} }],
  ["/structure/project-file-structure.html", { loader: () => import(/* webpackChunkName: "structure_project-file-structure.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/structure/project-file-structure.html.js"), meta: {"title":""} }],
  ["/modules/cart-module.html", { loader: () => import(/* webpackChunkName: "modules_cart-module.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/modules/cart-module.html.js"), meta: {"title":"Cart Module"} }],
  ["/modules/coupon-module.html", { loader: () => import(/* webpackChunkName: "modules_coupon-module.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/modules/coupon-module.html.js"), meta: {"title":"Coupon Module"} }],
  ["/modules/health-monitor-module.html", { loader: () => import(/* webpackChunkName: "modules_health-monitor-module.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/modules/health-monitor-module.html.js"), meta: {"title":"Health Monitor Module"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/components/", { loader: () => import(/* webpackChunkName: "components_index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/components/index.html.js"), meta: {"title":"Components"} }],
  ["/data-tables/", { loader: () => import(/* webpackChunkName: "data-tables_index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/index.html.js"), meta: {"title":"Data Tables"} }],
  ["/hmac/", { loader: () => import(/* webpackChunkName: "hmac_index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/hmac/index.html.js"), meta: {"title":"Hmac"} }],
  ["/structure/", { loader: () => import(/* webpackChunkName: "structure_index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/structure/index.html.js"), meta: {"title":"Structure"} }],
  ["/modules/", { loader: () => import(/* webpackChunkName: "modules_index.html" */"C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/modules/index.html.js"), meta: {"title":"Modules"} }],
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
