// sw.js v5 - force clear all caches on every update
const CACHE_NAME = 'bpsnk-v5';

self.addEventListener('install', e => {
  // Skip waiting immediately - activate right away
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    // Delete ALL caches regardless of name
    caches.keys().then(keys => {
      console.log('[SW] Clearing caches:', keys);
      return Promise.all(keys.map(k => caches.delete(k)));
    }).then(() => {
      console.log('[SW] All caches cleared');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', e => {
  // Always fetch from network - never serve from cache
  if (e.request.url.includes('firestore') || 
      e.request.url.includes('googleapis') || 
      e.request.url.includes('firebase')) {
    return;
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
