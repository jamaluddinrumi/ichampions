let base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(base_url + "articles").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let articlesHTML = "";
          data.result.forEach(function (article) {
            articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl ? article.crestUrl : 'https://via.placeholder.com/266?text=No+Image'}" />
                  </div>
                </a>
                <div class="card-content">
                  <a href="./article.html?id=${article.id}">
                    <span class="card-title truncate font-bold">${article.name}</span>
                  </a>
                  <p class="italic text-opacity-50">${article.founded}</p>
                </div>
              </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetch(base_url + "competitions/2001/teams", {
    method: "POST",
    headers: {
      "X-Auth-Token": "de8dfc6cf270480287d33652b602510b",
    },
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.teams.forEach(function (article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl ? article.crestUrl : 'https://via.placeholder.com/266?text=No+Image'}" />
                  </div>
                </a>
                <div class="card-content">
                  <a href="./article.html?id=${article.id}">
                    <span class="card-title truncate font-bold">${article.name}</span>
                  </a>
                  <p class="italic text-opacity-50">${article.founded}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "article/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>${data.name}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>${data.address}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>${data.email}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>${data.address}</td>
                    </tr>
                    <tr>
                      <td>Short Name</td>
                      <td>${data.shortName}</td>
                    </tr>
                    <tr>
                      <td>Tla</td>
                      <td>${data.tla}</td>
                    </tr>
                    <tr>
                      <td>Venue</td>
                      <td>${data.venue}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>${data.website}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
      method: "POST",
      headers: {
        "X-Auth-Token": "de8dfc6cf270480287d33652b602510b",
      },
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat letiabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let articleHTML = `
          <div class="row">
            <div class="col s12 m7" id="articles">
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${data.crestUrl ? data.crestUrl : 'https://via.placeholder.com/266?text=No+Image'}" />
                </div>
                <div class="card-content">
                  <table>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>${data.name}</td>
                      </tr>
                      <tr>
                        <td>Address</td>
                        <td>${data.address}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>${data.email}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>${data.address}</td>
                      </tr>
                      <tr>
                        <td>Short Name</td>
                        <td>${data.shortName}</td>
                      </tr>
                      <tr>
                        <td>Tla</td>
                        <td>${data.tla}</td>
                      </tr>
                      <tr>
                        <td>Venue</td>
                        <td>${data.venue}</td>
                      </tr>
                      <tr>
                        <td>Website</td>
                        <td>${data.website}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        let body_content = document.getElementById("body-content");
        body_content.innerHTML = articleHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    articles.forEach(function (article) {
      let description = article.post_content.substring(0, 100);

      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${article.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (article) {
    let articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${article.post_title}</span>
        ${snarkdown(article.post_content)}
      </div>
    </div>
  `;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    let body_content = document.getElementById("body-content");
    body_content.innerHTML = articleHTML;

    // add  remove favorite team button
    let remove_button_html = `
      <i class="large material-icons">remove_circle</i>
    `;
    remove_button = document.createElement("div");
    remove_button.id = "remove";
    remove_button.className = "btn-floating btn-large red";
    remove_button.innerHTML = remove_button_html;
    let button_action_container = document.querySelector(".fixed-action-btn");
    console.log(button_action_container);
    button_action_container.appendChild(remove_button);

    remove_button.addEventListener("click", function (event) {
      event.preventDefault(); // Cancel the native event
      event.stopPropagation(); // Don't bubble/capture the event
      console.log("remove clicked");
      let idParam = urlParams.get("id");
      removeArticleById(idParam);
    });
  });
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
