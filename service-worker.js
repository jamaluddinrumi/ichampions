const CACHE_NAME = "ichampions-v8";
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/favorite.html",
  "/css/materialize.min.css",
  "/css/app.css",
  "/manifest.json",
  "/js/materialize.min.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/nav.js",
  "/js/api.js",
  "/favicon.ico",
  "/icon.png",
  "/img/ucl-bg-header.jpg",
  "/img/notification.png",
  "/img/pick_your_fav_team_below.png",
  "/img/UEFA_Champions_League_logo_2.svg",
  "/favicon/android-chrome-192x192.png",
  "/favicon/apple-touch-icon.png",
  "/favicon/browserconfig.xml",
  "/favicon/favicon-16x16.png",
  "/favicon/favicon-32x32.png",
  "/favicon/mstile-150x150.png",
  "/favicon/safari-pinned-tab.svg",
  "/favicon/favicon.ico",
  "/favicon.ico",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  let base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
