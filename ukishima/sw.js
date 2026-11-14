// しおさい浮島 Service Worker（ビルド時に自動生成）
const CACHE = 'shiosai-ba66b45b7a0c';
const FILES = ["./","assets/index-CxEXFJaE.js","assets/index-pTKQhgPk.css","icon-180.png","icon-192.png","icon-512.png","icon.svg","manifest.webmanifest"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('shiosai-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// 先にキャッシュを返し、なければネットワーク。ページ遷移はオフラインならキャッシュした index.html を返す
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: req.mode === 'navigate', ignoreVary: true }).then(
      (hit) =>
        hit ||
        fetch(req).catch(() => (req.mode === 'navigate' ? caches.match('./') : Response.error())),
    ),
  );
});
