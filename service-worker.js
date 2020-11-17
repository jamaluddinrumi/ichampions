importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log("Workbox berhasil dimuat");
else console.log("Workbox gagal dimuat");

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/team.html", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/css/app.css", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/icon.png", revision: "1" },
    { url: "/icon192.png", revision: "1" },
    { url: "/img/ucl-bg-header.jpg", revision: "1" },
    { url: "/img/notification.png", revision: "1" },
    { url: "/img/pick_your_fav_team_below.png", revision: "1" },
    { url: "/img/UEFA_Champions_League_logo_2.svg", revision: "1" },
    { url: "/favicon/android-chrome-192x192.png", revision: "1" },
    { url: "/favicon/apple-touch-icon.png", revision: "1" },
    { url: "/favicon/browserconfig.xml", revision: "1" },
    { url: "/favicon/favicon-16x16.png", revision: "1" },
    { url: "/favicon/favicon-32x32.png", revision: "1" },
    { url: "/favicon/mstile-150x150.png", revision: "1" },
    { url: "/favicon/safari-pinned-tab.svg", revision: "1" },
    { url: "/favicon/favicon.ico", revision: "1" },
    { url: "/favicon.ico", revision: "1" },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/unpkg\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "unpkg",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-api",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);
