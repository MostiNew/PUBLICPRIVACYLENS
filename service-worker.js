const CACHE_NAME = 'privacyLens-v1';
const ASSETS = [
    '/PRIVACYLENS/',
    '/PRIVACYLENS/index.html',
    '/PRIVACYLENS/manifest.json',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS))
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((response) => response || fetch(e.request))
    );
});
