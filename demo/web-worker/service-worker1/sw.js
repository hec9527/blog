console.log('load service worker');

// 安装的时候注册缓存资源，该资源会使用fetch获取
self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open('APP_CACHE').then((cache) => {
      console.log('[Service Worker] cache all resource');
      cache.addAll(['/web-worker/service-worker1/index.html', '/img/share/蒙娜丽莎的假笑.jpg', '/favicon.ico']);
    }),
  );
});

// 后续请求资源优先读取缓存

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return (
        r ||
        fetch(e.request).then(function (response) {
          return caches.open('APP_CACHE').then(function (cache) {
            console.log('[Service Worker] Caching new resource: ' + e.request.url);
            cache.addAll([e.request.url]);
            return response;
          });
        })
      );
    }),
  );
});
