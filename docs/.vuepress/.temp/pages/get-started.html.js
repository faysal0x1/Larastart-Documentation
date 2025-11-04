import comp from "C:/laragon/www/Larastart-Documentation/docs/.vuepress/.temp/pages/get-started.html.vue"
const data = JSON.parse("{\"path\":\"/get-started.html\",\"title\":\"Get Started\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Pages\",\"slug\":\"pages\",\"link\":\"#pages\",\"children\":[]},{\"level\":2,\"title\":\"Content\",\"slug\":\"content\",\"link\":\"#content\",\"children\":[]},{\"level\":2,\"title\":\"Configuration\",\"slug\":\"configuration\",\"link\":\"#configuration\",\"children\":[]},{\"level\":2,\"title\":\"Layouts and customization\",\"slug\":\"layouts-and-customization\",\"link\":\"#layouts-and-customization\",\"children\":[]}],\"git\":{\"updatedTime\":1762248779000,\"contributors\":[{\"name\":\"faysal0x1\",\"username\":\"faysal0x1\",\"email\":\"faysal35-3119@diu.edu.bd\",\"commits\":1,\"url\":\"https://github.com/faysal0x1\"}],\"changelog\":[{\"hash\":\"0618fd42430ec03ca4dc89945d8f3e54a4ed99f8\",\"time\":1762248779000,\"email\":\"faysal35-3119@diu.edu.bd\",\"author\":\"faysal0x1\",\"message\":\"first commit\"}]},\"filePathRelative\":\"get-started.md\"}")
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
