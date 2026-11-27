// غزالي خزانه - service worker (offline shell). Bump VERSION when shell files change.
const VERSION = 'gk-shell-v29';
const SHELL = [
  './',
  'index.html',
  'app.html',
  'accounts.js',
  'account-utils.mjs',
  'ghazali-gemini.js?v=7',
  'ghazali_all_100_plants_final.json',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  // Split app shell: styles, data chunks, and JavaScript modules.
  'data/images.js',
  'data/taj-records.js',
  'data/fig-text.js',
  'data/word-detail-layout.js',
  'data/pomegranate.js',
  'data/reviewed-records.js',
  'data/lst45.js',
  'data/afghan-embed.js',
  'css/base.css',
  'css/mint-lens.css',
  'css/afghan-plants.css',
  'css/account-v2.css',
  'css/settings.css',
  'css/book-design.css?v=21',
  'js/mint-lens-init.js',
  'js/core.js?v=16',
  'js/account-v2.js',
  'js/improvements-v2.js',
  'js/plantnet-id.js',
  'js/entry-names.js',
  'js/firebase-dashboard.js?v=15',
  'js/settings-modern.js',
  'js/hardware-back.js',
  'js/afghan-plants.js',
  'data/molecules.js?v=2',
  'js/book-design.js?v=25'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith('gk-shell-') && key !== VERSION)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Leave Firebase, Pl@ntNet, Google, and other external requests to the network.
  if (url.origin !== self.location.origin) return;

  // Network first: use fresh files when online, cached files when offline.
  event.respondWith(
    fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(VERSION).then(cache => cache.put(request, copy)).catch(() => {});
      }
      return response;
    }).catch(() =>
      caches.match(request).then(cached =>
        cached || (request.mode === 'navigate' ? caches.match('app.html') : undefined)
      )
    )
  );
});
