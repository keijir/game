// Ocean Frontier Service Worker（ビルド時に自動生成）
const CACHE = 'ocean-frontier-c88ba0e35792';
const FILES = ["./","assets/index-2zzEPStf.css","assets/index-B4bYL2W-.js","assets/three-CyrviYtU.js","icon-180.png","icon-192.png","icon-512.png","icon.svg","manifest.webmanifest"];

self.addEventListener('install', (e) => {
  // ブラウザの HTTP キャッシュに残った古い index.html をつかまないよう、必ずサーバーから取り直す
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ocean-frontier-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// 自分のキャッシュを先に見て、なければネットワーク。ページ遷移はオフラインならキャッシュした index.html を返す
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req, { ignoreSearch: req.mode === 'navigate', ignoreVary: true }).then(
        (hit) => hit || fetch(req).catch(() => (req.mode === 'navigate' ? c.match('./') : Response.error())),
      ),
    ),
  );
});
