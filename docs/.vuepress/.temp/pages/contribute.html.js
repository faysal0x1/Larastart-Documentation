import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/contribute.html.vue"
const data = JSON.parse("{\"path\":\"/contribute.html\",\"title\":\"How to Contribute\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"How to Contribute\"},\"git\":{\"updatedTime\":1762250141000,\"contributors\":[{\"name\":\"faysal0x1\",\"username\":\"faysal0x1\",\"email\":\"faysal35-3119@diu.edu.bd\",\"commits\":1,\"url\":\"https://github.com/faysal0x1\"}],\"changelog\":[{\"hash\":\"764b19b88ed9a3df95f7b373232ebceccf9b4980\",\"time\":1762250141000,\"email\":\"faysal35-3119@diu.edu.bd\",\"author\":\"faysal0x1\",\"message\":\"Add documentation pages: About, Contact, and How to Contribute\"}]},\"filePathRelative\":\"contribute.md\"}")
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
