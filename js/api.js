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
function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2001/teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
          data.teams.forEach(function (team) {
            teamsHTML += `
              <div class="card">
                <a href="./team.html?id=${team.id}" class="team-card-link">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl ? team.crestUrl : 'https://via.placeholder.com/266?text=No+Image'}" />
                  </div>
                </a>
                <div class="card-content">
                  <a href="./team.html?id=${team.id}">
                    <span class="card-title truncate font-bold">${team.name}</span>
                  </a>
                  <p class="italic text-opacity-50">${team.founded}</p>
                </div>
              </div>
            `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          let teams = document.getElementById("teams");
          teams.innerHTML = teamsHTML;
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
      // console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += `
              <div class="card">
                <a href="./team.html?id=${team.id}" class="team-card-link">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl ? team.crestUrl : 'https://via.placeholder.com/266?text=No+Image'}" />
                  </div>
                </a>
                <div class="card-content">
                  <a href="./team.html?id=${team.id}">
                    <span class="card-title truncate font-bold">${team.name}</span>
                  </a>
                  <p class="italic text-opacity-50">${team.founded}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      let teams = document.getElementById("teams");
      teams.innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamByID() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      // if (false) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamHTML = `
              <div class="row">
                <div class="col s12 m7" id="team">
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
                            <td><a href="mailto:${data.email}">${data.email}</a></td>
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
                            <td><a href="${data.website}">${data.website}</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;

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
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let teamHTML = `
        <div class="row">
          <div class="col s12 m7" id="team">
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
                      <td><a href="mailto:${data.email}">${data.email}</a></td>
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
                      <td><a href="${data.website}">${data.website}</a></td>
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
        body_content.innerHTML = teamHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(function (team) {
      let description = team.post_content.substring(0, 100);

      teamsHTML += `
                  <div class="card">
                    <a href="./team.html?id=${team.ID}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.post_title}</span>
                      <p>${description}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (team) {
    let teamHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${team.cover}" />
      </div>
      <div class="card-content">
        <span class="card-title">${team.post_title}</span>
        ${snarkdown(team.post_content)}
      </div>
    </div>
  `;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    let body_content = document.getElementById("body-content");
    body_content.innerHTML = teamHTML;

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
