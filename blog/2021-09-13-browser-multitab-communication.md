---
title: 浏览器多标签通信
author: hec9527
author_title: 前端切图工程师
author_url: https://github.com/hec9527
author_image_url: https://avatars.githubusercontent.com/u/28671232?v=4
description: 浏览器多标签通信
tags: [html, javascript，面试]
---

浏览器中如何实现多个标签之间的通信?

<!-- truncate -->

链接： [Github 首页](https://github.com/hec9527)

有的时候我们需要在多个标签之间传递消息，比如用户的登录信息，用户的购物车信息或者在有些文档类的网站，记录用户的阅读信息。基本上都是在另外一个标签中进行操作后，另外一个标签就能及时获取并且处理数据。

## localstorage 实现

使用 localstorage 实现跨标签通信，依靠的是 window 的 onstorage 事件，这个事件可以查看新旧值的变化。同时在同一个域名下的 localstorage 是共享的，所以我们在一个标签内容存数据的时候，另外一个标签是可以感知到的，下面附上 demo

```html title="home.html"
<dialog open>
  <h3>Home</h3>
  <p id="greeting"></p>
  <a id="login" href="./profile.html" target="__blank">login</a>
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
  <a href="./profile.html" target="__blank" id="login">>login</a>
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
