---
title: 解决跨域，看这一篇博客就够了
author: hec9527
author_title: 前端切图工程师
author_url: https://github.com/hec9527
author_image_url: /img/avatar-circle.png
description: 什么是跨域，如何解决前端开发工作中的跨域问题？各种方案都有什么优劣？解决前端跨域，看这一篇博客就够了！
keywords: [javascript, webpack, 面试, 跨域, jsonp, CORS, ajax, 前端代理, 后端代理]
tags: [javascript, webpack, 面试, 跨域, jsonp, CORS, ajax, 前端代理, 后端代理]
# draft: true
# image:
---

![](img/2021-12-30-cross-domain/cross-domain-cover.jpeg)

跨域就像牛皮鲜一样粘在每一个前端工程师身上，可以说没遇到或者没解决过跨域的前端工程师，不是真正的前端工程师。不论在工作中还是在面试中，总会遇到或者被问到跨域的问题，所以无论是出于解决问题还是应付面试，理解并且解决跨域都是每个前端工程师的必修课，那么什么是跨域呢？又该如何解决跨域的问题？

<!-- truncate -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 说明

如果觉得过程太详细，可以直接查看每个小结最后总结，本博客所有案例均可在[github 案例源码](https://github.com/hec9527/blog/tree/master/demo/跨域解决方法)获取

## 什么是跨域

在知道什么是跨域之前，需要先知道什么是同源策略，我们看看 `MDN` 的定义

> **同源策略**是一个重要的安全策略，它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

那么同源的定义是什么，同样根据 `MDN` 的定义。

> 如果两个 URL 的 protocol、port 和 host 都相同的话，则这两个 URL 是同源

举个例子，下面这两个 URL 就是同源的，因为他们的`协议`、`主机`、`端口`(https 默认使用 443 端口)都是相同的

```zsh
https://hec9527.top/search/
https://hec9527.top/archive/
```

下面这两个 url 就不是同源的，因为他们的协议不一样。

```zsh
https://hec9527.top/search/
http://hec9527.top/archive/
```

总之 协议、主机、端口三者缺一不可，必须全部相同，才符合同源策略。否则属于跨域，会被浏览器同源策略给禁止。

根据 MDN 对同源策略的定义，同源策略是为了解决非同源资源交互存在的安全风险。举个栗子 🌰

我们用浏览器登录了淘宝，然后再访问了其它网站 A，如果没有同源策略的话，A 网站包含的恶意脚本可能会获取你在登录淘宝后的 token，然后使用这个 token 冒充你在淘宝进行操作，存在安全风险，同源策略的出现，就确保了一个源下的资源只能操作自己的内容。

## 如何解决跨域

常用的解决跨域的方式有下面四种，接下来我会一一介绍这四种方式以及他们的优缺点

- JSONP
- CORS（跨域资源访问）
- 前端代理
- 反向代理

### JSONP

首先什么是 JSONP 呢？

> 浏览器端通过 script 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP

为什么 script 标签可以，其它标签比如`<a/>`标签可不可以呢。说到这里我们需要知道 src 和 href 这两个属性的区别，看下面这几个案例:

- 引用 css 文件：`href="index.css"`
- 引用 js 文件：`src="index.js"`
- 引用图片：`src="banner.jpg"`
- 网站链接：`href="http://hec9527.top"`

上面的案例总结一句话就是：**src 用于代替这个元素，而 href 则用于这个标签和外部资源之间的关联**

像 `img` `video` `iframe` 等都是替换元素，为啥只能是 `script` 标签呢，这是因为这些元素虽然可以引用跨域资源，但是他们不能直接和当前域的资源建立联系，而 script 标签中的脚本加载完成后会自动执行，依靠这个特性可以将请求来的数据插入到当前域的上下文

我们先使用 `express-generator` 搭建一个 `express` 后端服务，作为我们测试跨域的服务器，

```zsh
# 生成服务端代码
npx express-generator server
# 安装依赖
cd server && npm i
# 启动服务  默认：3000端口
npm run start
```

我们简单修改一下后端的路由，返回一个常见的 json 数据，然后重启 express 服务，在浏览器中访问 `http://localhost:3000`，就能看到 express 服务返回的数据了

```js title="server/routes/index.js"
router.get('/', function (req, res, next) {
  var data = {
    code: 0,
    data: {
      name: 'saga',
      age: 34,
      gender: 1,
    },
    message: 'ok',
  };
  res.send(data);
});
```

此时我们新建一个`index.html`文件，在这个文件中添加以下脚本

```html
<script>
  fetch('http://localhost:3000');
</script>
```

然后使用 `node` 工具 [serve](https://www.npmjs.com/package/serve) 启动一个静态资源服务，在这个服务中打开刚刚的`index.html`文件。serve 服务默认监听 5000 端口，之前的 express 服务监听的 3000 端口，这两个端口不一样，我们访问的时候就会遇到跨域的问题，此时在浏览器控制台就会看到以下报错信息

![](img/2021-12-30-cross-domain/跨域问题.png)

我们简单修改一下服务端路由，让后端返回 jsonp 数据

```js title="server/routes/index.js" {11,12}
router.get('/', function (req, res, next) {
  var data = {
    code: 0,
    data: {
      name: 'saga',
      age: 34,
      gender: 1,
    },
    message: 'ok',
  };
  // res.send(data);
  res.jsonp(data);
});
```

`res.jsonp` 会读取请求中的 `callback` 参数，并且使用该参数作为回调函数的名称。此时我们在浏览器中直接访问`http://localhost:3000/?callback=jsonp_1`然后查看控制台网络请求，就可以看到服务端以 JSONP 形式返回的数据了。但直接在浏览器中访问并没有和项目结合起来。

![](img/2021-12-30-cross-domain/jsonp-数据返回.png)

回到我们之前的`index.html`，我们需要在这个文件中执行跨域请求并且将返回的数据写在页面上。在 `html` 文件中我们添加以下简单的 jsonp 实现

```js title="jsonp.js"
var count = 0;
var timeout = 60 * 1000;

function jsonP(url, params, success, error) {
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script = document.createElement('script');
  var callback = 'jsonp_' + count++;
  var timer;

  timer = setTimeout(() => clean(), timeout);
  params.callback = callback;

  window[callback] = function (data) {
    success && success(data);
    clean();
  };

  function clean() {
    timer && clearTimeout(timer);
    script.parentNode && script.parentNode.removeChild(script);
  }

  script.src = formateUrl(url, params);
  target.parentNode.insertBefore(script, target);
  return clean();
}

function formateUrl(url = '', params = {}) {
  var urlFragments = [];
  for (key in params) {
    urlFragments.push(`${key}=${params[key]}`);
  }
  var _url = url + (url.indexOf('?') === -1 ? '?' : '&');
  return _url + urlFragments.join('&');
}
```

然后再删掉之前的 fetch 请求代码，添加以下代码

```js
// fetch('http://localhost:3000');
jsonP('http://localhost:3000', {}, function (data) {
  document.body.innerHTML = JSON.stringify(data);
});
```

刷新一下浏览器就可以在页面中看到从`localhost:3000`请求回来的数据了

![](img/2021-12-30-cross-domain/jsonp-实践.png)

:::info

**总结：** JSONP 的实现原理就是利用 script 元素可以跨域请求资源，通过动态插入 script 标签，资源加载到本地后会立即执行的特性完成数据交互

优点：

- 兼容性好，支持老式浏览器

缺点：

- 非正式传输协议，只支持 GET 请求，不支持 post、put 等其它 http 请求（本质上 script 加载资源就是 GET）
- 客户端和服务端需要定制化开发，服务端返回的数据不是标准的 JSON 数据，而是 callback 包裹后的数据

:::

### CORS（跨域资源访问）

首先我们来看看 MDN 关于 CORS 的定义

> CORS （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的 HTTP 头组成，这些 HTTP 头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。
>
> 同源安全策略 默认阻止“跨域”获取资源。但是 CORS 给了 web 服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。

CORS 需要浏览器和服务器同时支持，目前 IE10+都支持，整个 CORS 过程都是浏览器自动完成的，前端开发者使用 CORS 通信和同源 AJAX 通信没有差别，所以实现 CORS 通信的关键是服务器，只要服务器实现了 CORS 对应接口响应就可以实现跨源通信。

#### 简单请求和非简单请求

CORS 请求分为简单请求和非简单请求，只要满足以下两个条件就是简单请求，简单请求是为了兼容 form 表单，form 表单的 action 一直都可以实现跨域请求。对于简单请求，浏览器会直接发起 Ajax 请求，并且在请求中添加 Origin 字段用来表示请求是从哪个源发起的

1. 请求方法是以下三种之一

- GET
- POST
- HEAD

2. HTTP 的 head 只能包含以下几个字段

- Accept
- Accept-Language
- Content-Language
- Content-Type (值只限：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)
- Last-Event-ID

我们新创建一个 `index.html`文件，同样使用 serve 启动静态资源服务。在 html 文档中添加以下内容

```html
<script>
  fetch('http://localhost:3000');
</script>
```

打开浏览器 devtool 的网络面板，可以看到浏览器只发起了一个 ajax 请求，这个请求出现了一个 CORS 错误，这个错误暂时不用管，后面会处理

![](img/2021-12-30-cross-domain/cors-简单请求-无预检.png)

#### 非简单请求

除了`简单请求`就是`非简单请求`，非简单请求在发起真实请求之前会先发送一个 `OPTIONS` 请求，称之为预检请求，预检请求的作用是为了询问服务器当前网页所在域名是否在服务器的许可名单中，以及可以使用哪些 HTTP 请求类型和请求头字段，只有得到服务器肯定的答复之后才会发起正式的 Ajax 请求，否则会报错

我们修改一下`index.html`中的脚本，在 `fetch` 中使用 `put`请求方式，`put`不属于简单请求的 http 请求类型，所以一定会触发预检请求

```html
<script>
  // fetch('http://localhost:3000');
  fetch('http://localhost:3000', { method: 'put', headers: { 'X-code-by': 'hec' } });
</script>
```

> tips: 点击每个预检请求红色箭头所指示的地方，可以找到对应的真实请求

#### 请求头字段

点开 OPTIONS 请求，可以看到请求头里面包含两个特殊字段：`Access-Control-Request-Method: PUT`, `Access-Control-Request-Headers: x-code-by`，同时还包含一个字段 `Origin`，这些字段不需要开发者手动添加，当浏览器发起跨源请求的时候会自动添加

- `Origin`

  发起请求的源，该字段为浏览器自动添加，并且拒绝开发者修改

- `Access-Control-Request-Method`：

  该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法

- `Access-Control-Request-Headers`：

  该字段是可选的一个逗号分隔的字符串，用于指定浏览器 CORS 请求会额外发送的请求头信息

![](img/2021-12-30-cross-domain/cors-非简单请求-有预检.png)

说了一大堆，CORS 还是报错，还是没有拿到跨域资源。诶，别着急，我们这就说说怎么解决跨域的问题，首选在 express 服务的最外层添加一个中间件（至少在路由之前），中间件中设置一堆`Access-Control-xxx`响应头

```js title="server/app.js"
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, x-code-by');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
```

这里我们个响应头设置了几个字段，如果为`OPTIONS`请求，则直接设置状态码 200 并且结束请求。需要注意的是，这里响应的状态码，必须是`2xx`，如果响应状态码非`2xx`，依然会出现跨域问题。然后修改一下路由，因为之前的路由只能处理 `GET` 请求，现在我们修改为 `all`，处理所有类型请求

```js title="server/routes/index.js" {1}
router.all('/', function (req, res) {
  var data = {
    code: 0,
    data: {
      name: 'saga',
      age: 34,
      gender: 1,
    },
    message: 'ok',
  };
  res.send(data);
});
```

刷新浏览器，再次查看 devtool，可以看到预检请求和正式请求返回都是 200，成功拿到后端跨源数据。

![](img/2021-12-30-cross-domain/cors-非简单请求-成功.png)

#### 响应头字段

我们又遇到几个新的 HTTP 头字段，这里罗列一下所有跨源访问响应头的字段以及具体的使用说明：

- `Access-Control-Allow-Origin`

  指定了允许访问该资源的外域 URI，对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求，如果服务器需要使用 cookie，则需要指定具体的域名。**注意：当发出跨源请求时，第三方 cookie 策略仍将适用。**

- `Access-Control-Allow-Methods`

  用于预检请求的响应，其指明了实际请求所允许使用的 HTTP 方法，多个方法用逗号隔开

- `Access-Control-Allow-Headers`

  用于预检请求的响应，其指明了实际请求中允许携带的 http 头字段，多个头字段用逗号隔开

- `Access-Control-Expose-Headers`

  在跨源访问时，XMLHttpRequest 对象的 getResponseHeader() 方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，需要服务器设置本响应头

- `Access-Control-Max-Age`

  指定了预检请求的结果能够被缓存多久，即：在多久之内发送非简单跨源请求时，不用发送预检请求，单位秒。如果值为-1，表示禁用缓存，每个请求都必须发送预检请求。`Chromium`默认为 5 秒，`v76`之前最大可以设置 600 秒（10 分钟），`V76`之后最大可以设置 7200 秒（2 小时），Firefox 中最大可以设置 86400 秒（24 小时）

- `Access-Control-Allow-Credentials`

  指定了当浏览器的 credentials 设置为 true 时是否允许浏览器读取 response 的内容

:::warning
如果项目中同时设置了 JSONP 和 CORS，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口
否则 JSONP 接口会被处理成开启了 CORS 的接口
:::

:::info
**总结：** CORS 需要后端支持，前端开发者不需要做任何修改

优点：

- CORS 支持所有的请求类型

缺点：

- 低版本浏览器不支持，`<IE10`

相关请求头：

- `Origin`
- `Access-Control-Request-Method`：
- `Access-Control-Request-Headers`：

相关响应头：

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Expose-Headers`
- `Access-Control-Max-Age`
- `Access-Control-Allow-Credentials`

:::

### 前端代理

前端代理的典型就是 webpack 开发服务器，通过前端代理服务器代理请求，实现跨域访问的能力。下面我们就来一步步实现前端代理，首先我们快速创建一个前端项目，也可以直接克隆现成的[案例](https://github.com/hec9527/blog/tree/master/demo/跨域解决方法/前端代理)

<Tabs groupId="fed-proxy">
<TabItem value="package" label="package.json">

```json title="package.json"
{
  "name": "fed-proxy",
  "version": "1.0.0",
  "description": "跨域资源前端代理",
  "main": "index.js",
  "scripts": {
    "build": "webpack --mode production",
    "start": "webpack serve --mode development"
  },
  "author": "hec9527",
  "license": "ISC",
  "dependencies": {
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.65.0",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.7.2"
  }
}
```

</TabItem>

<TabItem value="webpack.config.js" label="webpack.config.js">

```js title='webpack.config.js'
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
```

</TabItem>

<TabItem value="index.js" label="index.js">

```js title="src/index.js"
fetch('/proxy');
```

</TabItem>
</Tabs>

我们继续使用之前的 `express` 服务器作为测试服务器，同时注释掉 CORS 中间件，不允许跨源访问资源，克隆上面的代码或者手写一份，然后执行 `npm run dev` 启动开发服务器。在浏览器中访问：`http:localhost:8080`，查看 `devtool` 在可以看到成功的拿到了后端返回的数据

![](img/2021-12-30-cross-domain/前端代理-成功.png)

前端代理的原理是，前端项目和后端服务部署在相同源，比如上面的 express 服务，我们在 express 服务的 `server/public`中新建的 `html` 资源可以直接在浏览器中访问到，比如 `http:localhost:3000/public/CORS/index.html`。此时 `html` 资源在`http:localhost:3000`，后端服务也在`http:localhost:3000`，这时候就不存在跨域问题了，可以直接访问。但是这里的服务并不是真正处理业务的服务，给它发请求并不能给我们数据，所以为了拿到后端的数据我们还需要想其它办法。值得之一的是：**同源策略**只针对浏览器，express 之类的后端服务并没有这个限制，所以这些服务可以在收到前端请求的时候，将这个请求转发到对应的业务服务器，接收到数据后再发送给前端，当了一次中间人。

:::info
**总结：** 前端代理是本地启一个 node（也可以是其它）服务，前端项目作为这个服务器的静态资源，前端项目访问后端服务的时候，将对应的请求转到发到真实的后端服务，接收到请求后再发送给前端。主要利用的是后端服务不受**同源策略**限制

优点：

- 前端可以自己解决跨域问题，JSONP 和 CORS 都需要后端配合

缺点：

- 仅在开发时有效，上线后实际使用的用户不可能自己配置代理服务

:::

### 反向代理（后端代理）

后端代理的原理和前端代理差不多，都是利用服务端不受同源策略限制的特性，但是实现方式却不一样，因为代理的服务在后端，这里我们以 Nginx 服务器为例

首先在服务器上搭建一个 express 服务作为我们的业务服务器，挂载在`http://test.hec9527.top:10086`

![](img/2021-12-30-cross-domain/反向代理-express.png)

创建一个 html 文件，添加以下脚本，使用 nginx 同样托管在`http://test.hec9527.top`（前端项目上线后基本也是使用 Nginx 直接托管静态资源），需要注意的是，这里没有带端口号，走默认的 80 端口

```html title='index.html'
<script>
  fetch('http://test.hec9527.top:10086');
</script>
```

在浏览器中打开 `http://test.hec9527.top` 查看，红色线框处显示跨域，这是因为我们后端服务托管在`http://test.hec9527.top:10086`，而前端项目托管在 `http://test.hec9527.top:80`，这两个地址端口不一样，所以跨域。下面我们配置一下 nginx，代理一下后端接口

![](img/2021-12-30-cross-domain/反向代理-express-跨域.png)

:::note
如果不知道 nginx 实际使用的配置文件是哪个也不知道在哪里，可以使用 `nginx -t` 查看

```zsh
[root@VM-24-15-centos ~]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

:::

在 nginx 配置文件的 http 模块中添加以下内容，使用 `nginx -t` 测试 nginx 配置文件没问题后，使用 `nginx -s reload`重启服务

```
server {
    listen   80;
    listen   [::]:80;
    root     /path/to/index/file

    location /proxy_express/ {
        proxy_pass      http://0.0.0.0:10086/;
    }
}
```

:::warning
这里配置代理需要注意， `proxy_pass`后面的地址带`/`会将请求转发到根路径，如果不带`/`转发的时候会带上 `/proxy_express/`

:::

同时修改一下 index.html，这次我们不再直接请求后端接口，而是请求托管前端资源的服务器，让这个服务器代理我们的请求，从而避开跨域的问题。

```html {2,3}
<script>
  // fetch('http://test.hec9527.top:10086');
  fetch('http://test.hec9527.top/proxy_express/');
</script>
```

在浏览器中测试一下， nice，没有报跨域的问题，成功拿到后端的数据

![](img/2021-12-30-cross-domain/反向代理-express-成功.png)

:::info
**总结：** 正向代理（前端代理）是在开发侧启动代理服务，而后端代理则是在真实的服务侧启动代理服务

优点：

- 前端、后端都不需要做任何修改，只需要运维配置反向代理服务
- 用户不能直接访问后端服务，具备额外安全性

缺点：

- 需要代理服务，前端无法和后端交互，增加请求响应时间
- 代理服务器压力过大，当请求量超过代理服务器最大负载时，会直接影响后端集群性能

:::

## 总结

解决跨域的方式多种多样，没有最好的只有最适合的，需要根据每个项目的实际情况选择最合适的跨域解决方案，如果兼容`IE<=10`则选 JSONP 或者后端代理，如果是开发阶段，可以选择前端代理。只考虑现代浏览器，首推 CORS。
