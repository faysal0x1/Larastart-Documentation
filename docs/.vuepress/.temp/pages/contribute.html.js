import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contribute.html.vue"
const data = JSON.parse("{\"path\":\"/contribute.html\",\"title\":\"How to Contribute\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"How to Contribute\"},\"readingTime\":{\"minutes\":0.25,\"words\":74},\"filePathRelative\":\"contribute.md\"}")
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
