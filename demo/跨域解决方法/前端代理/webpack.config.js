const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import("webpack").Configuration} */
const config = {
  entry: './index.js',

  output: {
    clean: true,
  },

  plugins: [new HtmlWebpackPlugin()],
};

module.exports = config;
