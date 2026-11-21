// غزالي خزانه - service worker (offline shell). Bump VERSION when shell files change.
const VERSION = 'gk-shell-v4';
const SHELL = ['./', 'index.html', 'app.html', 'accounts.js', 'account-utils.mjs', 'ghazali-gemini.js?v=6',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('gk-shell-') && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only handle our own files; Firebase, Pl@ntNet, Google etc. go straight to the network.
  if (url.origin !== self.location.origin) return;
  // Network first (so updates show), fall back to cache when offline.
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('app.html') : undefined)))
  );
});
