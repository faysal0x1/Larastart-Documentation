import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contribute.html.vue"
const data = JSON.parse("{\"path\":\"/contribute.html\",\"title\":\"How to Contribute\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"How to Contribute\"},\"headers\":[{\"level\":2,\"title\":\"Development setup\",\"slug\":\"development-setup\",\"link\":\"#development-setup\",\"children\":[]},{\"level\":2,\"title\":\"Making changes\",\"slug\":\"making-changes\",\"link\":\"#making-changes\",\"children\":[]},{\"level\":2,\"title\":\"Commit and PR\",\"slug\":\"commit-and-pr\",\"link\":\"#commit-and-pr\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"contribute.md\"}")
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
