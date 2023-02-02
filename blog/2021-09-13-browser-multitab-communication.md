---
title: 浏览器多标签通信
author: hec9527
author_title: 前端切图工程师
author_url: https://github.com/hec9527
author_image_url: /img/avatar-circle.png
description: 浏览器多标签通信
tags: [html, javascript, 面试]
---

浏览器中如何实现多个标签之间的通信?

<!-- truncate -->

有的时候我们需要在多个标签之间传递消息，比如用户的登录信息，用户的购物车信息或者在有些文档类的网站，记录用户的阅读信息。基本上都是在另外一个标签中进行操作后，另外一个标签就能及时获取并且处理数据。

## localstorage 实现

使用 localstorage 实现跨标签通信，依靠的是 window 的 onstorage 事件，这个事件可以查看新旧值的变化。同时在同一个域名下的 localstorage 是共享的，所以我们在一个标签内容存数据的时候，另外一个标签是可以感知到的，下面附上 demo

```html title="home.html"
<dialog open>
  <h3>Home</h3>
  <p id="greeting"></p>
  <a id="login" href="./profile.html" target="_blank">login</a>
</dialog>

<script>
  const gt = document.getElementById('greeting');
  const lg = document.getElementById('login');

  function update(name) {
    if (!name) {
      gt.innerHTML = "You don't login";
    } else {
      gt.innerHTML = 'Hello ' + name;
    }
  }

  update();

  window.addEventListener('storage', (e) => {
    console.log(e);
    update(e.newValue);
    lg.style.display = 'none';
  });
</script>
```

```html title="profile.html"
<dialog open>
  <h3>Login</h3>
  <p>Hello please input your name first</p>
  <input type="text" placeholder="Please input your name" />
  <button id="btn_setName">Set Name</button>
</dialog>

<script>
  const btn = document.getElementById('btn_setName');
  const input = document.getElementsByTagName('input')[0];
  btn.addEventListener('click', () => {
    localStorage.setItem('name', input.value);
    console.log('set name:', input.value);
    window.close();
  });
</script>
```

:::tip
以上代码为 html 片段，只包含关键信息，将代码单独保存贴到浏览器中即可运行，也可以[查看源码](https://github.com/hec9527/blog/tree/main/demo/浏览器多标签通信/localstorage)
:::

## Cookie + setInterval 实现

通过以上方式我们知道，在同一个域名下可以共享数据的话就可以实现通信，同理 Cookie 也是在同域名共享的，我们也可以通过 Cookie 来实现跨标签通信，不过因为我们没法知道 Cookie 的变化，所以需要用到定时器，来不断获取新的 Cookie 信息

```html title="hmtl.html"
<p>
  Hello，
  <span id="name"></span>
  <a href="./profile.html" target="_blank" id="login">>login</a>
</p>

<script>
  const uName = document.getElementById('name');
  const login = document.getElementById('login');

  function getCookie(key) {
    const cookie = document.cookie.replace(/;\s+/gim, '","').replace(/=/gim, '":"');
    return cookie && JSON.parse('{"' + cookie + '"}')[key];
  }
  setInterval(() => {
    const value = getCookie('name');
    if (value) {
      login.style.display = 'none';
      uName.innerHTML = value;
    }
  }, 1000);
</script>
```

```html title="profile.html"
<dialog open="">
  <input type="text" placeholder="please input your name" />
  <button id="setname">setName</button>
</dialog>

<script>
  const input = document.getElementsByTagName('input')[0];
  const setName = document.getElementById('setname');

  setName.onclick = () => {
    input.value && (document.cookie = 'name=' + input.value);
    window.close();
  };
</script>
```

:::caution
不太推荐将 Cookie 用于跨标签信息传递，因为 Cookie 大多时候用于保存用户的身份验证信息，在发送请求的时候会发送到服务器，如果 Cookie 保存太多无用的信息会导致服务器流量的浪费
:::

## postMessage

`window.postMessage`是 H5 新增的特性，可安全地实现跨源通信，也可以用于跨标签通信。使用方式如下

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

#### `otherWindow`

其它窗口的引用，可以来自于`window.open`也可以来自于`iframe`标签的 `contentWindow` 属性

#### `message`

将要发送给其它窗口的数据，该数据会被序列化，可以安全的传输 JSON 对象以及其他结构化数据，目标窗口接收到的数据是反序列化后的结果，使用时无需关注序列化和反序列化

#### `targetOrigin`

通过指定 `targetOrigin` 来限制哪些窗口能接收到消息事件，其值可以是某个具体的 URI 也可以是`"*"`，使用`"*"`表示向所有站点广播消息，当可以明确接受窗口 `origin` 时，尽量使用具体的值

#### `transfer`

可选， 和 `message` 一起发送的对象， 很少使用

### 使用案例

简单了解完 postMessage 的使用方法后，我们来看看下面这个案例，这个案例中实现了两个域名的窗口的跨域通信。 可以自己手撸代码也可以[github 地址](https://github.com/hec9527/blog/tree/master/demo/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%A4%9A%E6%A0%87%E7%AD%BE%E9%80%9A%E4%BF%A1/postmessage)中直接下载源码

我们在本地新建一个 html 文件作为发送方，这里通过使用 `window.open` 来获取其它窗口的引用

```html title="index.html"
<script>
  const otherUrl = 'http://localhost:53784/other.html';
  const otherWindow = window.open(otherUrl, '_blank');

  window.addEventListener('message', (e) => {
    console.log('获取响应消息：', e);
    if (e.data.type === 'INIT') {
      return setInterval(() => {
        otherWindow.postMessage({ type: 'showGreeting', msg: 'hello world from index.html' }, '*');
      }, 3000);
    }
    document.body.innerHTML += `<p>响应：${JSON.stringify(e.data)}</p>`;
  });
</script>
```

下面接着添加消息接收方，尝试运行案例时，请将发送方中 `otherUrl` 修改为接收方实际的地址

```html title='other.html'
<script>
  (function () {
    window.addEventListener(
      'DOMContentLoaded',
      (e) => {
        window.opener.postMessage({ type: 'INIT' }, '*');
        setInterval(() => {
          window.opener.postMessage({ type: 'showTime', Date: new Date() }, '*');
        }, 1000);
      },
      { once: true },
    );
  })();

  window.addEventListener('message', (e) => {
    console.log(e);
    document.body.innerHTML += `<p>${JSON.stringify(e.data)}</p>`;
  });
</script>
```

解释一下代码流程：

1. 发送方通过 `window.open` 打开一个新的窗口并且获得这个窗口的引用
2. 接收方页面加载完成后，通过 `window.opener` 获取打开当前窗口的窗口的引用，通过这个窗口引用发送 `INIT` 消息，并且定时发送消息给发送方
3. 发送方接收到消息后，开始定时给接收方发送消息，并且将接收方发送的消息添加到 dom

:::info

最近简单看了一下 `vscode` 的源码发现 `vscode` 中 `webview` 实际上也是一个 `iframe` 标签，在创建 `webview` 的时候保存窗口的引用，然后在 `webview` 中添加 `acquireVsCodeApi` 来实现 `webview` 与 `vscode` 之间的消息通信

:::
