document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit();
});

let base_url = "https://api.football-data.org/v2/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getTeams() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2001/teams")
      .then(function (response) {
        let teamsHTML = '';
        if (response) {
          response.json().then(function (data) {
            data.teams.forEach(function (team) {
              teamsHTML += `
                <div class="col s6 m4">
                  <div class="card">
                    <a href="./team.html?id=${team.id}" class="team-card-link">
                      <div class="card-image p-4 waves-effect waves-block waves-light">
                        <img src="${
                          team.crestUrl
                            ? team.crestUrl
                            : "https://via.placeholder.com/266?text=No+Image"
                        }" alt="${team.name} logo" />
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
      let teamsHTML = '';
      data.teams.forEach(function (team) {
        teamsHTML += `
          <div class="col s6 m4">
            <div class="card">
              <a href="./team.html?id=${team.id}" class="team-card-link">
                <div class="card-image p-4 waves-effect waves-block waves-light">
                  <img src="${
                    team.crestUrl
                      ? team.crestUrl
                      : "https://via.placeholder.com/266?text=No+Image"
                  }" alt="${team.name} logo" />
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
      let teams = document.getElementById("teams");
      teams.innerHTML = teamsHTML;
    })
    .catch(error);


}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            document.title = data.name;

            let teamHTML = `
                <div class="col s12 m6">
                  <div class="card">
                    <div class="card-image p-4">
                      <img src="${
                        data.crestUrl
                          ? data.crestUrl
                          : "https://via.placeholder.com/266?text=No+Image"
                      }" alt="${data.name} logo"/>
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
          teamHTML += `
          <div class="col s12 m6">
            <div class="card">

              <div class="card-content">
                <div class="card-title">
                Squad
              </div>
              <table>
                  <tbody>
          `;
          data.squad.forEach(function(player){
            teamHTML += `
              <tr>
                <td>${player.position}</td>
                <td>${player.name}</td>
              </tr>
            `;
          });
          teamHTML += `
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          `;
            document.getElementById("team").innerHTML = teamHTML;

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
        document.title = data.name;

        let teamHTML = `
        <div class="col s12 m6">
            <div class="card">
              <div class="card-image p-4">
                <img src="${
                  data.crestUrl
                    ? data.crestUrl
                    : "https://via.placeholder.com/266?text=No+Image"
                }" alt="${data.name} logo" />
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
        teamHTML += `
          <div class="col s12 m6">
            <div class="card">

              <div class="card-content">
                <div class="card-title">
                Squad
              </div>
              <table>
                  <tbody>
          `;
          data.squad.forEach(function(player){
            teamHTML += `
              <tr>
                <td>${player.position}</td>
                <td>${player.name}</td>
              </tr>
            `;
          });
          teamHTML += `
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          `;
        let body_content = document.getElementById("team");
        body_content.innerHTML = teamHTML;

        document.title = data.name;

        resolve(data);
      });

  });
}

function getSavedTeams() {
  let teamsHTML = '';
  getAll().then(function (teams) {
    if (teams.length === 0) {
      let teamsHTML = `<div class="p-6 text-center"><i class="large material-icons">sentiment_very_dissatisfied</i><p>ups, you still don't have any fav teams. Add one now!</p></div>`;
    } else {
      teams.forEach(function (team) {
        teamsHTML += `
                  <div class="col s6 m4">
                    <div class="card">
                      <a href="./team.html?id=${team.id}&saved=true">
                        <div class="card-image p-4 waves-effect waves-block waves-light">
                          <img src="${team.crestUrl}" alt="${team.name} logo" />
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
    }
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(idParam).then(function (data) {
    document.title = data.name;

    let teamHTML = `
                <div class="col s12 m6">
                  <div class="card">
                    <div class="card-image p-4">
                      <img src="${
                        data.crestUrl
                          ? data.crestUrl
                          : "https://via.placeholder.com/266?text=No+Image"
                      }" alt="${data.name} logo" />
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
          teamHTML += `
          <div class="col s12 m6">
            <div class="card">

              <div class="card-content">
                <div class="card-title">
                Squad
              </div>
              <table>
                  <tbody>
          `;
          data.squad.forEach(function(player){
            teamHTML += `
              <tr>
                <td>${player.position}</td>
                <td>${player.name}</td>
              </tr>
            `;
          });
          teamHTML += `
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          `;
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
                `;
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
                      <div class="col s12 m4">
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
                      <div class="col m8 from-wikipedia">
                        <div class="card">
                            <div class="card-content">
                                <p>The UEFA Champions League (abbreviated as UCL) is an annual club football competition organised by the
                                    Union of European Football Associations (UEFA) and contested by top-division European clubs, deciding
                                    the competition winners through a group and knockout format. It is one of the most prestigious football
                                    tournaments in the world and the most prestigious club competition in European football, played by the
                                    national league champions (and, for some nations, one or more runners-up) of their national
                                    associations.</p>
                                <p>
                                </p>
                                <p>Introduced in 1955 as the European Champion Clubs' Cup, commonly known as European Cup, it was initially
                                    a straight knockout tournament open only to the champions of Europe's domestic leagues, with its winner
                                    reckoned as the European club champion. The competition took on its current name in 1992, adding a
                                    round-robin group stage in 1991 and allowing multiple entrants from certain countries since 1997.[1] It
                                    has since been expanded, and while most of Europe's national leagues can still only enter their
                                    champion, the strongest leagues now provide up to four teams.[2][3] Clubs that finish next-in-line in
                                    their national league, having not qualified for the Champions League, are eligible for the second-tier
                                    UEFA Europa League competition, and from 2021, teams not eligible for the UEFA Europa League will
                                    qualify for a new third-tier competition called the UEFA Europa Conference League.[4]</p>
                                <p>In its present format, the Champions League begins in late June with a preliminary round, three qualifying
                                    rounds and a play-off round, all played over two legs. The six surviving teams enter the group stage,
                                    joining 26 teams qualified in advance. The 32 teams are drawn into eight groups of four teams and play
                                    each other in a double round-robin system. The eight group winners and eight runners-up proceed to the
                                    knockout phase that culminates with the final match in late May or early June.[5] The winner of the
                                    Champions League qualifies for the following year's Champions League, the UEFA Super Cup and the FIFA
                                    Club World Cup.[6][7] In 2020, the traditional schedule for UEFA matches was disrupted due to the impact
                                    of the COVID-19 pandemic. The format of the remainder of the tournament was temporarily amended as a
                                    result, with the quarter-finals and semi-finals being played as single match knockout ties at neutral
                                    venues in Lisbon, Portugal from 12 to 23 August.
                                </p>
                                <p>Spanish clubs have the highest number of victories (18 wins), followed by England (13 wins) and Italy (12
                                    wins). England has the largest number of winning teams, with five clubs having won the title. The
                                    competition has been won by 22 clubs, 12 of which have won it more than once.[8] Real Madrid is the most
                                    successful club in the tournament's history, having won it 13 times, including its first five seasons.
                                    Bayern Munich are the reigning champions, having beaten Paris Saint-Germain 1–0 in the 2020 final.</p>
                                <p>source: <a class="italic underline text-indigo-900" href="https://en.wikipedia.org/wiki/UEFA_Champions_League">https://en.wikipedia.org/wiki/UEFA_Champions_League</a></p>
                            </div>
                        </div>
                    </div>
                `;
      let body_content = document.getElementById("teams");
      body_content.innerHTML = competitionHTML;
    });

}