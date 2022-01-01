const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import("webpack").Configuration} */
const config = {
  entry: './src/index.js',
  output: { clean: true },
  devServer: {
    port: '8080',
    proxy: {
      '/proxy': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/proxy': '' },
      },
    },
  },
  plugins: [new HtmlWebpackPlugin()],
};

module.exports = config;
