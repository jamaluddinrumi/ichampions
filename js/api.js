document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
});

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
    caches
      .match(base_url + "competitions/2001/teams")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamsHTML = "";
            data.teams.forEach(function (team) {
              teamsHTML += `
                <div class="col s12 m3">
                  <div class="card">
                    <a href="./team.html?id=${team.id}" class="team-card-link">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${
                          team.crestUrl
                            ? team.crestUrl
                            : "https://via.placeholder.com/266?text=No+Image"
                        }" />
                      </div>
                    </a>
                    <div class="card-content">
                      <a href="./team.html?id=${team.id}">
                        <span class="card-title truncate font-bold">${
                          team.name
                        }</span>
                      </a>
                      <p class="italic text-opacity-50">${team.founded}</p>
                    </div>
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
      let teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += `
          <div class="col s12 m3">
            <div class="card">
              <a href="./team.html?id=${team.id}" class="team-card-link">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${
                    team.crestUrl
                      ? team.crestUrl
                      : "https://via.placeholder.com/266?text=No+Image"
                  }" />
                </div>
              </a>
              <div class="card-content">
                <a href="./team.html?id=${team.id}">
                  <span class="card-title truncate font-bold">${
                    team.name
                  }</span>
                </a>
                <p class="italic text-opacity-50">${team.founded}</p>
              </div>
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

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamHTML = `
                <div class="col s12 m3">
                  <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${
                        data.crestUrl
                          ? data.crestUrl
                          : "https://via.placeholder.com/266?text=No+Image"
                      }" />
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
                            <td><a href="mailto:${data.email}">${
              data.email
            }</a></td>
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
                            <td>Club Colors</td>
                            <td>${data.clubColors}</td>
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
                            <td><a href="${data.website}">${
              data.website
            }</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("team").innerHTML = teamHTML;

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
        let teamHTML = `
        <div class="col s12 m3">
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${
                  data.crestUrl
                    ? data.crestUrl
                    : "https://via.placeholder.com/266?text=No+Image"
                }" />
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
                      <td>Club Colors</td>
                      <td>${data.clubColors}</td>
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
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        let body_content = document.getElementById("team");
        body_content.innerHTML = teamHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });

  });
}

function getSavedTeams() {
  getAll().then(function (teams) {
    let teamsHTML = "";
    teams.forEach(function (team) {

      teamsHTML += `
                <div class="col s12 m3">
                  <div class="card">
                    <a href="./team.html?id=${team.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.founded}</p>
                    </div>
                  </div>
                </div>
              `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    let teamHTML = `
                <div class="col s12 m3">
                  <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${
                        data.crestUrl
                          ? data.crestUrl
                          : "https://via.placeholder.com/266?text=No+Image"
                      }" />
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
                            <td><a href="mailto:${data.email}">${
              data.email
            }</a></td>
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
                            <td>Club Colors</td>
                            <td>${data.clubColors}</td>
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
                            <td><a href="${data.website}">${
              data.website
            }</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
          `;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    let body_content = document.getElementById("team");
    body_content.innerHTML = teamHTML;
  });
}

function getCompetitionInfo() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2001/teams")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let competition = data.competition;
            let season = data.season;
            let competitionHTML = `
                      <div class="col s12 m3">
                        <div class="card">
                          <div class="card-image waves-effect waves-block waves-light p-4">
                            <img src="img/UEFA_Champions_League_logo_2.svg"/>
                          </div>
                          <div class="card-content">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Name</td>
                                  <td>${competition.name}</td>
                                </tr>
                                <tr>
                                  <td>Area</td>
                                  <td>${competition.area.name}</td>
                                </tr>
                                <tr>
                                  <td>Code</td>
                                  <td>${competition.code}</td>
                                </tr>
                                <tr>
                                  <td>Participants</td>
                                  <td>${data.count}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            let teams = document.getElementById("teams");
            teams.innerHTML = competitionHTML;
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
      let competition = data.competition;
      let season = data.season;
      let competitionHTML = `
                      <div class="col s12 m3">
                        <div class="card">
                          <div class="card-image waves-effect waves-block waves-light p-4">
                            <img src="img/UEFA_Champions_League_logo_2.svg"/>
                          </div>
                          <div class="card-content">
                            <table>
                              <tbody>
                                <tr>
                                  <td>Name</td>
                                  <td>${competition.name}</td>
                                </tr>
                                <tr>
                                  <td>Area</td>
                                  <td>${competition.area.name}</td>
                                </tr>
                                <tr>
                                  <td>Code</td>
                                  <td>${competition.code}</td>
                                </tr>
                                <tr>
                                  <td>Participants</td>
                                  <td>${data.count}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      let body_content = document.getElementById("teams");
      body_content.innerHTML = competitionHTML;
    });

}