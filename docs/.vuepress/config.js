import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'
import { tocPlugin } from '@vuepress/plugin-toc'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Larastart',
  description: 'Larastart — Laravel starter kit with repository pattern and JSX components',
  base: '/Larastart-Documentation/',

  theme: hopeTheme({
    logo: 'https://raw.githubusercontent.com/github/explore/main/topics/laravel/laravel.png',

    plugins: {
      icon: {
        assets: 'iconify',
      },

      search: {
        maxSuggestions: 10,
        locales: {
          '/': {
            placeholder: 'Search docs',
          },
        },
      },
    },

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
        { text: 'Home', link: '/', icon: 'mdi:home-outline' },
        { text: 'Get Started', link: '/get-started', icon: 'mdi:rocket-launch-outline' },
        { text: 'Project Overview', link: '/project-overview', icon: 'mdi:rocket-launch-outline' },
        {
          text: "HMac Security",
          collapsible: true,
          icon: 'mdi:rocket-launch-outline',
          children: [
            { text: 'AppSecurity-Combined.md', link: '/hmac/AppSecurity-Combined.md', icon: 'mdi:rocket-launch-outline' },
            { text: 'AppTokenController.md', link: '/hmac/AppTokenController.md', icon: 'mdi:rocket-launch-outline' },
            {
              text: 'VerifyAppSignature.md',
              link: '/hmac/VerifyAppSignature.md',
              icon: 'mdi:rocket-launch-outline'
            },
            {
              text: 'VerifyAppJwt.md',
              link: '/hmac/VerifyAppJwt.md',
              icon: 'mdi:rocket-launch-outline'
            }
          ],
        },
        {
          text: "File Structure",
          collapsible: true,
          icon: 'mdi:folder-outline',
          children: [
            { text: 'Project File Structure', link: '/structure/project-file-structure', icon: 'mdi:folder-outline' },
            { text: "Module File Structure", link: "/structure/module-file-structure", icon: "mdi:folder-outline" },
          ],
        },
        {
          text: "Modules",
          collapsible: true,
          icon: 'mdi:folder-outline',
          children: [
            {
              text: 'Cart Module',
              link: '/modules/cart-module',
              icon: 'mdi:cart-outline'
            },
            {
              text: 'Health Monitor Module',
              link: '/modules/health-monitor-module',
              icon: 'mdi:cart-outline'
            },
            {
              text: "Coupon Module",
              link: "/modules/coupon-module",
              icon: "mdi:cart-outline"
            }

          ],
        },
        {
          text: 'Components',
          collapsible: true,
          icon: 'mdi:cube-outline',
          children: [
            { text: 'Actions Dropdown', link: '/components/actions-dropdown', icon: 'mdi:menu-swap-outline' },
            { text: 'Can Component', link: '/components/can-component-docs', icon: 'mdi:shield-check-outline' },
            { text: 'Utility Helper', link: '/components/utility-helpers-docs', icon: 'mdi:tools' },
          ],
        },

        {
          text: 'Data Tables',
          collapsible: true,
          icon: 'mdi:table-large',
          children: [
            { text: 'Data Tables', link: '/data-tables/data-table-docs', icon: 'mdi:view-list-outline' },
            { text: 'Datatable Buttons', link: '/data-tables/datatable-buttons-docs', icon: 'mdi:table-arrow-down' },
            { text: 'Table Utils', link: '/data-tables/table-utils-docs', icon: 'mdi:table-cog' },
            { text: 'Global Form', link: '/data-tables/global-form-docs', icon: 'mdi:form-select' },
            { text: 'Listing Page', link: '/data-tables/listing-page-docs', icon: 'mdi:format-list-bulleted-square' },
          ],
        },

        { text: 'About', link: '/about', icon: 'mdi:information-outline' },
        { text: 'Contact', link: '/contact', icon: 'mdi:email-outline' },
        { text: 'Contribute', link: '/contribute', icon: 'mdi:hand-heart-outline' },
      ],
    },
  }),

  plugins: [
    tocPlugin(),
  ],

  bundler: viteBundler(),
})
