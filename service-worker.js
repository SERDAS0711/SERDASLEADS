// service-worker.js

// Ein einfacher Cache-Name
const CACHE_NAME = 'my-site-cache-v1';

// Hier listest du die Dateien auf, die der Service Worker
// beim Installieren cachen soll.
// Passe Pfade bei Bedarf an (z.B. "/index.html", "/styles.css", etc.)
const urlsToCache = [
  './',          // root, damit index.html gefunden wird
  './index.html'
];

// Install Event: Dateien in den Cache legen
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivieren: hier könnte man alte Caches löschen etc.
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
});

// Fetch Event: Aus dem Cache bedienen, falls vorhanden
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache-Hit - gib die gecachte Antwort zurück
      if (response) {
        return response;
      }
      // Sonst normal aus dem Netz holen
      return fetch(event.request);
    })
  );
});
