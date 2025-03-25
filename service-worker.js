// service-worker.js

const CACHE_NAME = 'immobilien-cache-v1';
const urlsToCache = [
  './',
  './index.html'
  // Füge hier weitere Dateien hinzu, die gecacht werden sollen (z. B. CSS, JS, Bilder)
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

