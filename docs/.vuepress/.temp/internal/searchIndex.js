export const searchIndex = [
  {
    "title": "About",
    "headers": [
      {
        "level": 2,
        "title": "Goals",
        "slug": "goals",
        "link": "#goals",
        "children": []
      },
      {
        "level": 2,
        "title": "Project",
        "slug": "project",
        "link": "#project",
        "children": []
      }
    ],
    "path": "/about.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Contact",
    "headers": [
      {
        "level": 2,
        "title": "Support channels",
        "slug": "support-channels",
        "link": "#support-channels",
        "children": []
      },
      {
        "level": 2,
        "title": "Reporting issues",
        "slug": "reporting-issues",
        "link": "#reporting-issues",
        "children": []
      }
    ],
    "path": "/contact.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "How to Contribute",
    "headers": [
      {
        "level": 2,
        "title": "Development setup",
        "slug": "development-setup",
        "link": "#development-setup",
        "children": []
      },
      {
        "level": 2,
        "title": "Making changes",
        "slug": "making-changes",
        "link": "#making-changes",
        "children": []
      },
      {
        "level": 2,
        "title": "Commit and PR",
        "slug": "commit-and-pr",
        "link": "#commit-and-pr",
        "children": []
      }
    ],
    "path": "/contribute.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Get Started",
    "headers": [
      {
        "level": 2,
        "title": "Pages",
        "slug": "pages",
        "link": "#pages",
        "children": []
      },
      {
        "level": 2,
        "title": "Content",
        "slug": "content",
        "link": "#content",
        "children": []
      },
      {
        "level": 2,
        "title": "Configuration",
        "slug": "configuration",
        "link": "#configuration",
        "children": []
      },
      {
        "level": 2,
        "title": "Layouts and customization",
        "slug": "layouts-and-customization",
        "link": "#layouts-and-customization",
        "children": []
      }
    ],
    "path": "/get-started.html",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "Home",
    "headers": [],
    "path": "/",
    "pathLocale": "/",
    "extraFields": []
  },
  {
    "title": "",
    "headers": [],
    "path": "/404.html",
    "pathLocale": "/",
    "extraFields": []
  }
]

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  })
}
