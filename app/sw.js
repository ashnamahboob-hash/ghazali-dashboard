// غزالي خزانه - service worker (offline shell). Bump VERSION when shell files change.
const VERSION = 'gk-shell-v3';
const SHELL = ['./', 'index.html', 'app.html', 'accounts.js', 'account-utils.mjs',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  // split app.html: styles, code and data files
  'css/base.css', 'css/mint-lens.css', 'css/afghan-plants.css', 'css/account-v2.css', 'css/settings.css',
  'js/mint-lens-init.js', 'js/core.js', 'js/account-v2.js', 'js/improvements-v2.js', 'js/plantnet-id.js',
  'js/entry-names.js', 'js/firebase-dashboard.js', 'js/settings-modern.js', 'js/hardware-back.js', 'js/afghan-plants.js',
  'data/images.js', 'data/taj-records.js', 'data/fig-text.js', 'data/word-detail-layout.js', 'data/pomegranate.js',
  'data/reviewed-records.js', 'data/lst45.js', 'data/afghan-embed.js'];

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
