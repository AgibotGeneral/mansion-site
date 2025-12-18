// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer');

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula; // or prismThemes.vsDark

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MANSION',
  tagline: 'Multi-floor language-to-3D scene generation for long-horizon embodied tasks',
  favicon: 'img/favicon.ico',

  // TODO: set to your GitHub org/user + repo
  url: 'https://your-domain.com',
  baseUrl: '/',

  organizationName: 'your-org',
  projectName: 'mansion',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
          editUrl:
            'https://github.com/your-org/mansion/edit/main/website/', // TODO
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      navbar: {
        title: 'MANSION',
        logo: { alt: 'MANSION Logo', src: 'img/logo.svg' },
        items: [
          { to: '/docs/getting-started/quickstart', label: 'Quickstart', position: 'left' },
          { to: '/docs/dataset/mansionworld', label: 'MansionWorld dataset', position: 'left' },
          { to: '/docs/api/overview', label: 'Mansion API', position: 'left' },
          { to: '/docs/intro', label: 'Documentation', position: 'left' },
          { href: 'https://github.com/your-org/mansion', label: 'GitHub', position: 'right' }, // TODO
        ],
      },
      footer: {
        style: 'dark',
        /**
           *
        links: [   
          {
            title: 'Docs',
            items: [
              { label: 'Getting started', to: '/docs/getting-started/installation' },
              { label: 'API reference', to: '/docs/api/overview' },
              { label: 'MansionWorld dataset', to: '/docs/dataset/mansionworld' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Issues', href: 'https://github.com/your-org/mansion/issues' }, // TODO
              { label: 'Discussions', href: 'https://github.com/your-org/mansion/discussions' }, // TODO
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Paper', href: 'https://arxiv.org' }, // TODO
              { label: 'License', to: '/docs/project/license' },
            ],
          },
        ],
        */
        copyright:
          `Copyright © ${new Date().getFullYear()} MANSION contributors.`,
      },
      prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
      colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
    }),
};

module.exports = config;
