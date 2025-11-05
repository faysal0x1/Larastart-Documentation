import { hopeTheme } from 'vuepress-theme-hope'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',
  // Important for GitHub Pages project sites: ensures assets are served from /<REPO_NAME>/
  base: '/Larastart-Documentation/',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      '/',
      { text: 'Getting Started', link: '/get-started' },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' },
      { text: 'Contribute', link: '/contribute' },
    ],

    sidebar: {
      '/': [
        '/',
        '/get-started',
        '/about',
        '/contact',
        '/contribute',
      ],
    },
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
      locales: {
        '/': {
          placeholder: 'Search docs',
        },
      },
    }),
  ],

  bundler: viteBundler(),
})
