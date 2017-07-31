// Version 0.57
let version = '0.3';

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('mileage-tracker').then(cache => {
      return cache.addAll([
        '/',
        '/index.html?timestamp=${timeStamp}',
        '/js/production.min.js?timestamp=${timeStamp}',
        '/images/logo.svg'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
