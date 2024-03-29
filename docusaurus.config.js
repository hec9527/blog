const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'hec9527的博客',
  tagline: 'Build With Docusaurus',
  url: 'https://hec9527.top',
  baseUrl: '/',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/avatar-circle.png',
  organizationName: 'hec9527',
  projectName: 'blog',
  staticDirectories: ['demo', 'share', 'static'],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    image: 'img/avatar-circle.png',
    metadata: [
      { name: 'keywords', content: 'hec9527的博客,前端,技术分享,前沿技术分享,9527,逆袭,react,webpack,vue,vscode' },
      { name: 'sogou_site_verification', content: 'EAknj58qT8' },
      { name: 'google-site-verification', content: '10K-_Z0ATBf2yCfrzfqL-RPUoeAqiPNtIpb9K9fT9ok' },
      { name: 'msvalidate.01', content: 'D9DDDDC0F2049E57687E3A4CFBBC6FEE' },
    ],
    algolia: {
      appId: '7HXI0RXPQH',
      apiKey: '0de48b50ec944e8731b345810fa0d639',
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
    footer: {
      style: 'dark',
      // style: 'light',
      links: [
        {
          title: '本站资源',
          items: [
            {
              label: '博客归档',
              href: '/archive',
            },
            {
              label: '站内搜索',
              href: '/search',
            },
            {
              label: '标签',
              href: '/tags',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/users/11867107/hec9527',
            },
            {
              label: 'Github',
              href: 'https://github.com/hec9527',
            },
            {
              label: '思否',
              href: 'https://segmentfault.com/u/hec9527',
            },
            {
              label: '知乎',
              href: 'https://www.zhihu.com/people/hec9527',
            },
          ],
        },
        {
          title: '小案例',
          items: [
            {
              label: 'canvas绘制时钟',
              href: 'https://github.com/hec9527/demo_canvas/tree/master/demo01-%E7%BB%98%E5%88%B6%E9%92%9F%E8%A1%A8',
            },
            {
              label: 'particles',
              href: 'https://github.com/hec9527/demo_canvas/tree/master/demo12-%E4%BB%BFparticles%E5%BA%93',
            },
          ],
        },
        {
          title: '友情链接',
          items: [
            {
              label: '峰华前端工程师',
              href: 'https://zxuqian.cn/',
            },
          ],
        },
      ],
      copyright: `<p>Copyright © ${new Date().getFullYear()} Hec9527 Built with Docusaurus.</p><p><a target="_blank" href="https://beian.miit.gov.cn">京ICP备2021039852号-1</a></p><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="/img/creative-commons-license-icon.png" /></a><br />本站所有内容遵循 <a rel="license" href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans" >CC BY-NC 4.0 协议</a>，转载须注明署名和出处，且不可用于商业用途。`,
    },
  },

  plugins: [path.resolve(__dirname, './src/plugin/plugin-baidu-analytics')],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/hec9527/blog/edit/master/',
        },
        blog: {
          routeBasePath: '/',
          blogTitle: 'hec9527 的博客',
          blogDescription:
            'hec9527的博客，这里有最新、最齐全、最有趣的技术分享以及实践demo，助你从前端小白逆袭成为大牛',
          blogSidebarTitle: '最新博客',
          showReadingTime: true,
          editUrl: 'https://github.com/hec9527/blog/edit/master/',
          feedOptions: {
            type: 'all',
            title: 'hec9527',
            copyright: `版权所有 © ${new Date().getFullYear()} Hec9527(何春) Built with Docusaurus`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
      },
    ],
  ],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
  },
};
