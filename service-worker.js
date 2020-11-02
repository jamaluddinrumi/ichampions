const CACHE_NAME = "ichampions-v3";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/manifest.json",
  "/js/materialize.min.js",
  "/js/idb.js",
  "/js/db.js",
  "/js/nav.js",
  "/js/api.js",
  "/favicon.ico",
  "/img/UEFA_Champions_League_logo_2.svg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
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
  var base_url = "https://api.football-data.org/v2/";

  console.log('sw - fetch: ');
  console.log(event.request.url);

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
