import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contact.html.vue"
const data = JSON.parse("{\"path\":\"/contact.html\",\"title\":\"Contact\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Contact\"},\"headers\":[{\"level\":2,\"title\":\"Support channels\",\"slug\":\"support-channels\",\"link\":\"#support-channels\",\"children\":[]},{\"level\":2,\"title\":\"Reporting issues\",\"slug\":\"reporting-issues\",\"link\":\"#reporting-issues\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"contact.md\"}")
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
