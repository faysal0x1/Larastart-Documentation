import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/data-tables/listing-page-docs.html.vue"
const data = JSON.parse("{\"path\":\"/data-tables/listing-page-docs.html\",\"title\":\"ListingPage\",\"lang\":\"en-US\",\"frontmatter\":{},\"readingTime\":{\"minutes\":2.12,\"words\":636},\"filePathRelative\":\"data-tables/listing-page-docs.md\"}")
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
