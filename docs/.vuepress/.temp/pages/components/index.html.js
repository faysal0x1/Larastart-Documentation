import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/components/index.html.vue"
const data = JSON.parse("{\"path\":\"/components/\",\"title\":\"Components\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Components\",\"article\":false,\"feed\":false,\"sitemap\":false},\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null}")
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
