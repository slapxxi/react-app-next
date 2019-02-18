let path = require('path');
let dotenv = require('dotenv');

let withTypescript = require('@zeit/next-typescript');
let withTM = require('next-transpile-modules');
let withCSS = require('@zeit/next-css');
let withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
let withWorkers = require('@zeit/next-workers');

dotenv.config();

let nextConfig = {
  target: 'serverless',

  cssModules: true,

  cssLoaderOptions: {
    modules: true,
    camelCase: true,
    namedExport: true,
    importLoaders: 1,
    localIdentName: '[local]__[hash:base64:5]',
  },

  transpileModules: ['lodash-es'],

  env: {
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    },
  },

  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),

  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },

  webpack(config, options) {
    if (!options.isServer) {
      for (let entry of options.defaultLoaders.css) {
        if (entry.loader === 'css-loader') {
          entry.loader = 'typings-for-css-modules-loader';
          break;
        }
      }
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@self': path.resolve(__dirname),
    };

    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';

    return config;
  },

  exportPathMap() {
    return {};
  },
};

module.exports = withBundleAnalyzer(
  withTypescript(withWorkers(withCSS(withTM(nextConfig)))),
);
