let dbPromised = idb.open("ichampions-1", 1, function(upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
    autoIncrement: false
  });
  teamsObjectStore.createIndex("id", "id", { unique: true });
});

function allKeys() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAllKeys();
      })
      .then(function(allKeys) {
        resolve(allKeys);
      });
  });
}

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      // console.log(team);
      // console.log(team.id);
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil disimpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getAllByTitle(title) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readonly");
      let store = tx.objectStore("teams");
      let titleIndex = store.index("post_title");
      let range = IDBKeyRange.bound(title, title + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(teams) {
      console.log(teams);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function removeById(id) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil dihapus.");
    });
}
