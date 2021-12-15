---
title: 使用webpack搭建脚手架（三）
author: hec9527
author_title: 前端切图工程师
author_url: https://github.com/hec9527
author_image_url: https://avatars.githubusercontent.com/u/28671232?v=4
description: 之前的案例我们讲解了webpackd的基本用法，但是介于每次改动内容都需要手动打包内容，实在是太麻烦了。现在我们尝试使用webpack搭建开发服务器
tags: [webpack]
---

之前的案例我们讲解了 webpackd 的基本用法，但是介于每次改动内容都需要手动打包内容，实在是太麻烦了。现在我们尝试使用 webpack 搭建开发服务器

链接： [Github 首页](https://github.com/hec9527)

<!-- truncate -->

## 系列文章

- [webpack 入门](/blog/2021/09/08/my-webpack-cli-01)
- [webpack 的四大核心概念](/blog/2021/09/09/my-webpack-cli-02)
- [webpack 开发服务器](/blog/2021/09/10/my-webpack-cli-03)

## 使用 webpack 开发服务器

现在我们按照以下步骤重新创建一个项目

```shell
# 初始化npm包
npm init -y
# 安装webpack相关依赖
npm i -D webpack webpack-cli webpack-dev-server
# 安装html模板插件
npm i -D html-webpack-plugin
```

:::warning
使用`webpack-dev-server v4+` 需要 `node >= v12.13.0`、`webpack >= v4.37.0`
:::

简单修改一下 webpack 配置

```js title="webpack.config.js"
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import("webpack").Configuration} */
const config = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.[contenthash:4].js',
  },

  plugins: [new HtmlWebpackPlugin()],
};
module.exports = config;
```

接着我们添加一下入口文件

```js title="src/index.js"
document.body.innerHTML = 'hello world';
```

添加一下 npm 命令, 以下两个命令的效果是相同的，webpack4 及以前的版本主要使用的是下面的方式启动开发服务器，webpack5 现在也支持`webpack server`的方式启动

```json
"scripts": {
    "dev": "webpack server",
    "dev:server": "webpack-dev-server"
}
```

运行一下`npm run dev`查看终端的日志发现，程序并没有立即结束，在浏览器中打开 webpack 启动的地址（下面三个随便选一个都行），页面中应该会有一个`hello world`。如果我们修改入口函数的内容，比如将`'hello world'`修改为`'hello hec9527'`然后保存，这时候 webpack 会自动重新打包然后刷新页面

```shell {7-10}
➜  demo-02 git:(blog-demo) ✗ npm run dev

> demo-02@1.0.0 dev /Users/hec9527/code/webpack-dev/demo-02
> webpack server

<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/
<i> [webpack-dev-server] On Your Network (IPv4): http://172.30.4.83:8080/
<i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:8080/
<i> [webpack-dev-server] Content not from webpack is served from '/Users/hec9527/code/webpack-dev/demo-02/public' directory
asset bundle.567a.js 125 KiB [emitted] [immutable] [minimized] (name: main) 1 related asset
asset index.html 221 bytes [emitted]
runtime modules 27.1 KiB 13 modules
orphan modules 14.1 KiB [orphan] 7 modules
cacheable modules 197 KiB
  modules by path ./node_modules/webpack-dev-server/client/ 51.1 KiB
    modules by path ./node_modules/webpack-dev-server/client/modules/ 30.2 KiB 2 modules
    3 modules
  modules by path ./node_modules/webpack/hot/*.js 4.3 KiB 4 modules
  modules by path ./node_modules/html-entities/lib/*.js 81.3 KiB 4 modules
  modules by path ./node_modules/url/ 37.4 KiB 3 modules
  modules by path ./node_modules/querystring/*.js 4.51 KiB 3 modules
  ./src/index.js 41 bytes [built] [code generated]
  ./node_modules/ansi-html-community/index.js 4.16 KiB [built] [code generated]
  ./node_modules/events/events.js 14.5 KiB [built] [code generated]
webpack 5.52.0 compiled successfully in 1956 ms
```

至此，使用 webpack 搭建开发服务器就已经完成了。但是如果我想配置开发服务器该怎么办，比如我想要修改开发服务器的端口或则其它配置。

## wepback 开发服务器的配置

开发服务器通常使用默认配置就 ok 了，完整的配置可以参考[webpack 官网开发服务器配置指南](https://webpack.js.org/configuration/dev-server/)。

这里简单讲解一下代理和常用的配置

首先我们使用 express-generator 快速搭建一个 express 应用

```shell
# 全局安装依赖
npm install -g express-generator
# 创建目录（如果是window可以手动创建然后进入目录）
mkdir server && cd server
# 初始化express项目
express
# 安装epxress项目依赖
npm install
# 启动express项目
npm start
```

当我们启动项目后没有报错，在浏览器中打开 http://localhost:3000 页面显示 Express 则表示服务器已经成功启动了。接下来我们简单修改一下 webpack 配置

```js title="webpack.config.js"
const config = {
  // 省略部分内容 ...

  devServer: {
    historyApiFallback: true, // 当使用H5 的 history Api做前端路由的时候，任何404页面都会重定向到 inde.html 页面
    host: 'localhost', // 开发服务器启动的地址，通常不用设置或者设置为localhost
    port: '10086', // 开发服务器的端口，通常不用设置
    hot: true, // 模块热替换，在更新部分模块的时候，应用新代码的时候页面不会刷新，页面的状态得以保留
    open: true, // 开发服务器启动后自动在浏览器中打开地址
    proxy: {
      '/api': 'http://localhost:3000', // 现在对以 /api 开头的请求会代理到 'http://localhost:3000'
    },
  },

  plugins: [new HtmlWebpackPlugin()],
};
```

我们在 src/index.js 中添加一段代码，验证是否已经成功代理

```js
fetch('/api/users').then((res) => {
  console.log(res);
  document.body.innerText = res;
});
```

刷新浏览器后，查看查看浏览器 console 控制台，已经成功打印出请求的结果，并且 express 服务器也成功的打印出了请求日志，这表示我们的代理已经成了，但是查看浏览器的 network 面板，请求的地址还是 http://localhost:10086/api/users 并没有什么变化，这是因为代理实在开发服务器中进行的，浏览器实际请求的还是开发服务器。

:::tip
如果在代理后的请求中，不需要 `/api`，可以通过下面你的方式重写代码方式
:::

```js
proxy: {
    '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
    },
},
```
