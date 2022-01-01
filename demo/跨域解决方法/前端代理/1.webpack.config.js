const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import("webpack").Configuration} */
const config = {
  entry: './index.js',

  output: {
    clean: true,
  },

  plugins: [new HtmlWebpackPlugin()],
};

module.exports = config;
