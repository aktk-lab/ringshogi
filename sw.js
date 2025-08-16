// GitHub Pagesでもサブパスに自動対応
const BASE = self.registration.scope.replace(/\/$/, '');
const CACHE_NAME = 'ringshogi-v2';
const ASSETS = [
  `${BASE}/`, `${BASE}/index.html`, `${BASE}/manifest.webmanifest`,
  `${BASE}/sw.js`, `${BASE}/icons/icon-192.png`, `${BASE}/icons/icon-512.png`
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request)));
});
self.addEventListener('message', e=>{
  if(e.data?.type==='SKIP_WAITING') self.skipWaiting();
});
