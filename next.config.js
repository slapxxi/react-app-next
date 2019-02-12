let path = require('path');

let withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  webpack(config) {
    config.resolve.alias = { '@self': path.resolve(__dirname) };
    return config;
  },
});
