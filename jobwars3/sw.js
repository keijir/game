// JOB WARS Service Worker（ビルド時に自動生成）
const CACHE = 'jobwars3-406ab5ec9b14';
const FILES = ["./","art/award-bosses.webp","art/award-builds.webp","art/award-clear.webp","art/award-hard.webp","art/award-invest.webp","art/award-jobs.webp","art/award-kills.webp","art/award-level.webp","art/award-maxed.webp","art/award-perfect.webp","art/award-plays.webp","art/award-shields.webp","art/award-specials.webp","art/award-stars.webp","art/award-three.webp","art/award-weapons.webp","art/ch1-card.webp","art/ch10-card.webp","art/ch2-card.webp","art/ch3-card.webp","art/ch4-card.webp","art/ch5-card.webp","art/ch6-card.webp","art/ch7-card.webp","art/ch8-card.webp","art/ch9-card.webp","art/chef-attack.webp","art/chef-idle.webp","art/chef-stand.webp","art/courier-attack.webp","art/courier-idle.webp","art/courier-stand.webp","art/defense-attack.webp","art/defense-idle.webp","art/defense-stand.webp","art/doctor-attack.webp","art/doctor-idle.webp","art/doctor-stand.webp","art/enemy-claimKing.webp","art/enemy-claimer.webp","art/enemy-deadline.webp","art/enemy-forklift.webp","art/enemy-golem.webp","art/enemy-lunch.webp","art/enemy-notify.webp","art/enemy-nurse.webp","art/enemy-parcel.webp","art/enemy-principal.webp","art/enemy-rebound.webp","art/enemy-robot.webp","art/enemy-stock.webp","art/enemy-zombie.webp","art/entrepreneur-attack.webp","art/entrepreneur-idle.webp","art/entrepreneur-stand.webp","art/factory-map.webp","art/guard-attack.webp","art/guard-idle.webp","art/guard-stand.webp","art/harbor-map.webp","art/hero-attack.webp","art/hero-idle.webp","art/hero-stand.webp","art/icon-bell.webp","art/icon-binder.webp","art/icon-calculator.webp","art/icon-coin.webp","art/icon-cordon.webp","art/icon-decree.webp","art/icon-drift.webp","art/icon-drill.webp","art/icon-drink.webp","art/icon-express.webp","art/icon-feast.webp","art/icon-goldtie.webp","art/icon-helmet.webp","art/icon-hose.webp","art/icon-invest.webp","art/icon-knife.webp","art/icon-landing.webp","art/icon-lanyard.webp","art/icon-megaphone.webp","art/icon-objection.webp","art/icon-pen.webp","art/icon-pointer.webp","art/icon-ruler.webp","art/icon-seal.webp","art/icon-shout.webp","art/icon-siren.webp","art/icon-sneakers.webp","art/icon-soup.webp","art/icon-star.webp","art/icon-stickies.webp","art/icon-surgery.webp","art/icon-umbrella.webp","art/icon-volley.webp","art/icon-wrench.webp","art/lawyer-attack.webp","art/lawyer-idle.webp","art/lawyer-stand.webp","art/lobby-bg.webp","art/logo.webp","art/nav-bar.webp","art/nav-book.webp","art/nav-hero.webp","art/nav-home.webp","art/nav-hq.webp","art/nav-mid.webp","art/nav-on.webp","art/nav-stages.webp","art/perk-antenna.webp","art/perk-barricade.webp","art/perk-bounty.webp","art/perk-budget.webp","art/perk-coffee.webp","art/perk-copier.webp","art/perk-discount.webp","art/perk-fortify.webp","art/perk-morning.webp","art/racer-attack.webp","art/racer-idle.webp","art/racer-stand.webp","art/result-lose.webp","art/result-win.webp","art/school-map.webp","art/stage1-map.webp","art/stage2-map.webp","art/stage3-map.webp","art/title-bg.webp","art/tower-antenna-fire.webp","art/tower-antenna-idle.webp","art/tower-barricade-broken.webp","art/tower-barricade.webp","art/tower-coffee.webp","art/tower-copier-fire.webp","art/tower-copier-idle.webp","art/tower-stapler.webp","art/trainer-attack.webp","art/trainer-idle.webp","art/trainer-stand.webp","art/tsukemen-attack.webp","art/tsukemen-idle.webp","art/tsukemen-stand.webp","assets/index-D2pJn5YI.js","assets/index-PgahzVQF.css","assets/three-XAq0x7RW.js","icon-192.png","icon-512.png","icon.svg","manifest.webmanifest","models/hero.glb"];

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
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('jobwars3-') && k !== CACHE).map((k) => caches.delete(k))))
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
