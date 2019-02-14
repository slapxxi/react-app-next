let path = require('path');
let dotenv = require('dotenv');
let withTypescript = require('@zeit/next-typescript');
let withTM = require('next-transpile-modules');

dotenv.config();

module.exports = withTypescript(
  withTM({
    target: 'serverless',
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
    webpack(config) {
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
  }),
);
