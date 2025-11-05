import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { hopeTheme } from 'vuepress-theme-hope'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { tocPlugin } from '@vuepress/plugin-toc'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Larastart',
  description: 'Larastart — Laravel starter kit with repository pattern and JSX components',
  base: '/Larastart-Documentation/',

  theme: hopeTheme({
    logo: 'https://raw.githubusercontent.com/github/explore/main/topics/laravel/laravel.png',
    iconAssets: 'iconify',
    sidebarDepth: 0,
    toc: true,
    navbar: [
      { text: 'Home', link: '/', icon: 'mdi:home' },
      { text: 'Get Started', link: '/get-started', icon: 'mdi:rocket-launch' },
      { text: 'About', link: '/about', icon: 'mdi:information-outline' },
      {
        text: 'Components',
        icon: 'mdi:widgets',
        children: [
          { text: 'Actions Dropdown', link: '/actions-dropdown', icon: 'mdi:chevron-down-box' },
          { text: 'Can Component', link: '/can-component-docs', icon: 'mdi:shield-check' },
        ],
      },
      { text: 'Contact', link: '/contact', icon: 'mdi:email' },
      { text: 'Contribute', link: '/contribute', icon: 'mdi:account-heart-outline' },
      { text: 'GitHub', link: 'https://github.com/faysal0x1/larastart', icon: 'mdi:github' },
    ],

    sidebar: {
      '/': [
        { text: 'Home', link: '/', icon: 'mdi:home' },
        { text: 'Get Started', link: '/get-started', icon: 'mdi:rocket-launch' },
        { text: 'About', link: '/about', icon: 'mdi:information-outline' },
        {
          text: 'Components',
          collapsible: true,
          icon: 'mdi:widgets',
          children: [
            {
              text: 'Actions Dropdown',
              link: '/actions-dropdown',
              icon: 'mdi:chevron-down-box'
            },
            {
              text: 'Can Component',
              link: '/can-component-docs',
              icon: 'mdi:shield-check'
            },
            {
              text: 'Utility Helper',
              link: '/utility-helpers-docs',
              icon: 'mdi:shield-check'
            },
          ],
        },
        {
          text: 'Data Tables',
          collapsible: true,
          icon: 'mdi:widgets',
          children: [
            {
              text: 'Datatable Buttons',
              link: '/datatable-buttons-docs',
              icon: 'mdi:chevron-down-box'
            },
            {
              text: 'Table Utils',
              link: '/table-utils-docs',
              icon: 'mdi:chevron-down-box'
            },

            {
              text: "Global Form",
              link: '/global-form-docs',
              icon: 'mdi:chevron-down-box'
            }

          ],
        },
        { text: 'Contact', link: '/contact', icon: 'mdi:email' },
        { text: 'Contribute', link: '/contribute', icon: 'mdi:account-heart-outline' },
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
