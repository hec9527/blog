onmessage = function (e) {
  console.log('web worker 收到消息:', e.data);
  if (e.data.type === 'showTime') {
    postMessage(`当前时间： ${new Date().toLocaleDateString()}`);
  } else if (e.data.type === 'randomNum') {
    this.postMessage(`随机数： ${Math.random()}`);
  }
};

postMessage('web worker加载就绪');

console.log(this);
