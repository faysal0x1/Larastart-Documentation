import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"https://vuejs.press/images/hero.png\",\"actions\":[{\"text\":\"Get Started\",\"link\":\"/get-started.html\",\"type\":\"primary\"},{\"text\":\"View on GitHub\",\"link\":\"https://github.com/faysal0x1/larastart\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"Laravel Starter Kit\",\"details\":\"Batteries-included foundation to start new Laravel apps quickly.\"},{\"title\":\"Repository Pattern\",\"details\":\"Contracts and implementations that keep data access clean and testable.\"},{\"title\":\"Reusable JSX UI Components\",\"details\":\"A set of custom components you can compose to build UIs faster.\"},{\"title\":\"Modern Tooling\",\"details\":\"Vite-based build with a smooth developer experience.\"},{\"title\":\"Extensible Architecture\",\"details\":\"Modular structure for domains, services, and integrations.\"},{\"title\":\"Testing Ready\",\"details\":\"Sensible defaults to help you add unit and feature tests with confidence.\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present VuePress Community\"},\"readingTime\":{\"minutes\":0.47,\"words\":141},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
