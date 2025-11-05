import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/project-overview.html.vue"
const data = JSON.parse("{\"path\":\"/project-overview.html\",\"title\":\"Pencilbox Quiz\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":3.04,\"words\":913},\"filePathRelative\":\"project-overview.md\"}")
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
