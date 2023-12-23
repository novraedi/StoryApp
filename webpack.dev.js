/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      overlay: false,
    },
    watchFiles: ['src/**/*'],
  },
});
