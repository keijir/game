// HERO Service Worker（ビルド時に自動生成）
const CACHE = 'hero-dd3bd4c76733';
const FILES = ["./","apple-touch-icon.png","art/enemy/brassguard.webp","art/enemy/cablespider.webp","art/enemy/coilsoldier.webp","art/enemy/crawler.webp","art/enemy/dockcrab.webp","art/enemy/drillmole.webp","art/enemy/drone.webp","art/enemy/gatekeeper.webp","art/enemy/guardbot.webp","art/enemy/oil.webp","art/enemy/patchbot.webp","art/enemy/plowbot.webp","art/enemy/repair.webp","art/enemy/rivet.webp","art/enemy/sandcentipede.webp","art/enemy/scrapdog.webp","art/enemy/signdrone.webp","art/enemy/slag.webp","art/enemy/sparkbeetle.webp","art/enemy/valveturtle.webp","art/face.webp","art/gate.webp","art/hero/atlas.webp","art/icons/a-acc1.webp","art/icons/a-acc2.webp","art/icons/a-acc3.webp","art/icons/a-arms1.webp","art/icons/a-arms2.webp","art/icons/a-arms3.webp","art/icons/a-body1.webp","art/icons/a-body2.webp","art/icons/a-body3.webp","art/icons/a-head1.webp","art/icons/a-head2.webp","art/icons/a-head3.webp","art/icons/a-legs1.webp","art/icons/a-legs2.webp","art/icons/a-legs3.webp","art/icons/a-shield1.webp","art/icons/a-shield2.webp","art/icons/a-shield3.webp","art/icons/b-atk-0.webp","art/icons/b-atk-1.webp","art/icons/b-atk-2.webp","art/icons/b-def-0.webp","art/icons/b-def-1.webp","art/icons/b-def-2.webp","art/icons/b-hp-0.webp","art/icons/b-hp-1.webp","art/icons/b-hp-2.webp","art/icons/b-regen-0.webp","art/icons/b-regen-1.webp","art/icons/b-regen-2.webp","art/icons/g-1.webp","art/icons/g-2.webp","art/icons/g-3.webp","art/icons/g-4.webp","art/icons/g-5.webp","art/icons/g-6.webp","art/icons/p-code.webp","art/icons/p-link.webp","art/icons/p-records.webp","art/icons/p-save.webp","art/icons/s-atkBlunt.webp","art/icons/s-atkPierce.webp","art/icons/s-atkSlash.webp","art/icons/s-defBlunt.webp","art/icons/s-defPierce.webp","art/icons/s-defSlash.webp","art/icons/s-hp.webp","art/icons/s-regen.webp","art/icons/s-speed.webp","art/icons/w-cutter.webp","art/icons/w-spear.webp","art/icons/w-wrench.webp","art/logo.webp","art/objects.webp","art/objects2.webp","art/rubble.webp","art/splash.webp","art/tile-dune.webp","art/tile-grate.webp","art/tile-oil.webp","art/tile-plaza.webp","art/tile-road.webp","art/tile-rust.webp","art/tile-sand.webp","art/tile-scrap.webp","assets/index-BX-bAcoN.js","assets/index-Dwkv0Cb9.css","assets/three-aFkua3tG.js","icon-192.png","icon-512.png","manifest.webmanifest","ogp.jpg"];

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
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('hero-') && k !== CACHE).map((k) => caches.delete(k))))
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
