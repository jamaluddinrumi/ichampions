let dbPromised = idb.open("news-reader", 1, function(upgradeDb) {
  let articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "ID"
  });
  articlesObjectStore.createIndex("post_title", "post_title", {
    unique: false
  });
});

function removeArticleById(id) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("articles", "readwrite");
      let store = tx.objectStore("articles");
      console.log(id);
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil dihapus.");
      window.location.href = "/#saved";
    });
}

function saveForLater(article) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("articles", "readwrite");
      let store = tx.objectStore("articles");
      console.log(article);
      store.add(article.result);
      return tx.complete;
    })
    .then(function() {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("articles", "readonly");
        let store = tx.objectStore("articles");
        return store.getAll();
      })
      .then(function(articles) {
        resolve(articles);
      });
  });
}

function getAllByTitle(title) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("articles", "readonly");
      let store = tx.objectStore("articles");
      let titleIndex = store.index("post_title");
      let range = IDBKeyRange.bound(title, title + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(articles) {
      console.log(articles);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("articles", "readonly");
        let store = tx.objectStore("articles");
        return store.get(id);
      })
      .then(function(article) {
        resolve(article);
      });
  });
}
