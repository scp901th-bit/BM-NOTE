const CACHE_NAME='bpsnk-v6';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.url.includes('firestore')||e.request.url.includes('googleapis')||e.request.url.includes('firebase'))return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
