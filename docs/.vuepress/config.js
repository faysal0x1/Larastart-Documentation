import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { hopeTheme } from 'vuepress-theme-hope'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { tocPlugin } from '@vuepress/plugin-toc'

export default defineUserConfig({
  lang: 'en-US',
  title: 'VuePress',
  description: 'My first VuePress Site',
  base: '/Larastart-Documentation/',

  theme: hopeTheme({
    logo: 'https://vuejs.press/images/hero.png',
    sidebarDepth: 0,
    toc: true,
    navbar: [
      '/',
      { text: 'Getting Started', link: '/get-started' },
      { text: 'About', link: '/about' },
      {
        text: 'Components',
        children: [
          { text: 'Actions Dropdown', link: '/actions-dropdown' },
          { text: 'Can Component', link: '/can-component-docs' },
        ],
      },
      { text: 'Contact', link: '/contact' },
      { text: 'Contribute', link: '/contribute' },
    ],

    sidebar: {
      '/': [
        '/',
        '/get-started',
        '/about',
        {
          text: 'Components',
          collapsible: true,
          children: [
            '/actions-dropdown',
            '/can-component-docs',
          ],
        },
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
    tocPlugin(),
  ],

  bundler: viteBundler(),
})
