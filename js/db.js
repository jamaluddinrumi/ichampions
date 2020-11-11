let dbPromised = idb.open("ichampions-2", 1, function(upgradeDb) {
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
      store.put(team);
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
