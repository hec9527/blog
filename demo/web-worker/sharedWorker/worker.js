onconnect = function (e) {
  console.log('共享worker链接成功', e);

  var port = e.ports[0];

  port.addEventListener('message', function (e) {
    var workerResult = 'Result: ' + e.data[0] * e.data[1];
    port.postMessage(workerResult);
  });

  // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
  port.start();
};

console.log('xxx');
