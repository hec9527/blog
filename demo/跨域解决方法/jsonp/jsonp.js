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
