import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  history: 'hash',
  // base:'http://j.bjdglt.com/ucd/public/index.php/',
  // publicPath: '/dist/',
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['超级管理员', '管理员', '普通用户'],
          routes: [
            {
              path: '/',
              redirect: '/menu/config',
            },
            {
              path: '/menu',
              name: '菜单配置',
              icon: 'swap',
              authority: ['超级管理员', '管理员', '普通用户'],
              routes:[
                {
                  path: 'config',
                  name: '菜单配置',
                  icon: 'swap',
                  component: '../pages/menu/config',
                  authority: ['超级管理员', '管理员', '普通用户'],
                },
              ]
            },
            {
              path: '/news',
              name: '新闻发布',
              icon: 'swap',
              authority: ['超级管理员', '管理员', '普通用户'],
              routes:[
                {
                  path: 'list',
                  name: '新闻列表',
                  icon: 'swap',
                  component: '../pages/news/list',
                  authority: ['超级管理员', '管理员', '普通用户'],
                },
                {
                  path: 'edit',
                  name: '新闻编辑',
                  icon: 'swap',
                  component: '../pages/news/edit',
                  authority: ['超级管理员', '管理员', '普通用户'],
                },
              ]
            },
            {
              path: '/job',
              name: '招聘发布',
              icon: 'swap',
              authority: ['超级管理员', '管理员', '普通用户'],
              routes:[
                {
                  path: 'list',
                  name: '招聘列表',
                  icon: 'swap',
                  component: '../pages/job/list',
                  authority: ['超级管理员', '管理员', '普通用户'],
                },
                {
                  path: 'add',
                  name: '新增招聘',
                  icon: 'swap',
                  component: '../pages/job/add',
                  authority: ['超级管理员', '管理员', '普通用户'],
                },
              ]
            },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  proxy: {
    '/user': {
      target: 'http://u.bjdglt.com/index.php',
      changeOrigin: true,
      // pathRewrite: { '^/': '' },
    },
    '/conf': {
      target: 'http://u.bjdglt.com/index.php',
      changeOrigin: true,
      // pathRewrite: { '^/': '' },
    },
    '/report': {
      target: 'http://u.bjdglt.com/index.php',
      changeOrigin: true,
      // pathRewrite: { '^/': '' },
    },
  },
};
