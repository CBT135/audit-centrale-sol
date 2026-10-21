// Mode hors ligne : l'app reste utilisable sur site sans réseau.
// Changez VERSION à chaque mise à jour des fichiers pour forcer le rafraîchissement.
const VERSION = 'audit-sol-v2';
const CORE = ['./', 'index.html', 'checklist.js', 'lib/jszip.min.js', 'modele-audit.xlsx', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page principale : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(VERSION).then(c => c.put('index.html', copy));
        return r;
      }).catch(() => caches.match('index.html'))
    );
    return;
  }

  // Fichiers du site et polices Google : cache d'abord.
  const sameOrigin = url.origin === self.location.origin;
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (sameOrigin || fonts) {
    e.respondWith(
      caches.match(req, { ignoreSearch: sameOrigin }).then(hit => hit || fetch(req).then(r => {
        if (r.ok || r.type === 'opaque') {
          const copy = r.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return r;
      }))
    );
  }
});
