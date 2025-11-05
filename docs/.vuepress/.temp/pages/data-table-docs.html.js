import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-table-docs.html.vue"
const data = JSON.parse("{\"path\":\"/data-table-docs.html\",\"title\":\"DataTable\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":2.18,\"words\":654},\"filePathRelative\":\"data-table-docs.md\"}")
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
