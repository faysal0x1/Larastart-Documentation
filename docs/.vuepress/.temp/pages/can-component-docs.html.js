import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/can-component-docs.html.vue"
const data = JSON.parse("{\"path\":\"/can-component-docs.html\",\"title\":\"Can\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":3.75,\"words\":1124},\"filePathRelative\":\"can-component-docs.md\"}")
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
