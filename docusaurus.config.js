/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'hec9527的博客',
  tagline: 'Build With Docusaurus',
  url: 'https://blog.hec9527.top',
  baseUrl: '/',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/avatar-circle.png',
  organizationName: 'hec9527',
  projectName: 'blog',
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    image: 'img/avatar-circle.png',
    algolia: {
      appId: '7HXI0RXPQH',
      apiKey: 'ca105e73cac40121b52d7cbceec82224',
      indexName: 'hec_blog',
      contextualSearch: true,
    },
    navbar: {
      title: 'hec9257',
      logo: {
        alt: 'Site Logo',
        src: 'img/avatar.jpg',
      },
      items: [
        {
          label: '主页',
          href: '/',
          position: 'right',
        },
        // {
        //   type: 'doc',
        //   docId: 'intro',
        //   position: 'right',
        //   label: 'Tutorial',
        // },
        { to: '/blog', label: '博客', position: 'right' },
        // {
        //   label: '阅读源码',
        //   position: 'right',
        //   items: [
        //     {
        //       label: 'vue',
        //       href: 'https://v3.cn.vuejs.org',
        //     },
        //     {
        //       label: 'react',
        //       href: 'https://react.docschina.org',
        //     },
        //     {
        //       label: 'lodash',
        //       href: '/',
        //     },
        //     {
        //       label: '我的',
        //       href: '/review',
        //     },
        //   ],
        // },
        {
          label: 'Demo',
          position: 'right',
          items: [
            {
              label: '2048小游戏',
              href: 'https://github.com/hec9527/2048',
            },
            {
              label: 'BattleCity',
              href: 'https://github.com/hec9527/battlecity',
            },
            {
              label: 'Todo',
              href: 'https://github.com/hec9527/todo',
            },
          ],
        },
        {
          label: 'GitHub',
          href: 'https://github.com/hec9527/',
          position: 'right',
        },
      ],
    },
    // footer: {
    // style: 'dark',
    // style: 'light',
    // links: [
    //   {
    //     title: 'Docs',
    //     items: [
    //       {
    //         label: 'Tutorial',
    //         to: '/docs/intro',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Community',
    //     items: [
    //       {
    //         label: 'Stack Overflow',
    //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //       },
    //       {
    //         label: 'Discord',
    //         href: 'https://discordapp.com/invite/docusaurus',
    //       },
    //       {
    //         label: 'Twitter',
    //         href: 'https://twitter.com/docusaurus',
    //       },
    //     ],
    //   },
    //   {
    //     title: 'More',
    //     items: [
    //       {
    //         label: 'Blog',
    //         to: '/blog',
    //       },
    //       {
    //         label: 'GitHub',
    //         href: 'https://github.com/facebook/docusaurus',
    //       },
    //     ],
    //   },
    // ],
    // copyright: `Copyright © ${new Date().getFullYear()} Hec9527 Built with Docusaurus.`,
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/hec9527/blog/edit/main/',
        },
        blog: {
          blogTitle: 'hec9527 的博客',
          blogDescription: 'hec9527的博客，前端工程师的逆袭之路',
          blogSidebarTitle: '最新博客',
          showReadingTime: true,
          editUrl: 'https://github.com/hec9527/blog/edit/main/',
          feedOptions: {
            type: 'all',
            title: 'hec9527',
            copyright: `版权所有 © ${new Date().getFullYear()} Hec9527(何春) Built with Docusaurus`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
