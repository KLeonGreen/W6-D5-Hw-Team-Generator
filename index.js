const input = document.getElementById("add-name");
const addButton = document.getElementById("add-btn");
const addedNames = document.getElementById("names-show");
const decreaseTeamBtn = document.getElementById("decrease");
const increaseTeamBtn = document.getElementById("increase");
const displayTeamNbr = document.getElementById("display");
const assignIntoTeams = document.getElementById("assign-btn");
const displayNumberofTeams = document.getElementById("team-content");
const teamPlacement = document.querySelector(".left-side");
const namesList = [];

addButton.addEventListener("click", () => {
  const name = input.value;
  if (name !== "") {
    input.value = "";
    const liName = document.createElement("li");
    liName.textContent = name;
    liName.classList.add("li-style");
    addedNames.appendChild(liName);
    namesList.push(name);
  }
});

decreaseTeamBtn.addEventListener("click", () => {
  let teamNumber = parseInt(displayTeamNbr.textContent);
  if (teamNumber <= 1) {
    return;
  }
  teamNumber--;
  displayTeamNbr.textContent = teamNumber;
});

increaseTeamBtn.addEventListener("click", () => {
  let teamNumber = parseInt(displayTeamNbr.textContent);

  teamNumber++;
  displayTeamNbr.textContent = teamNumber;
});

const chunk = function (list, teamSize) {
  if (list.length <= teamSize) {
    return [list];
  }
  return [list.slice(0, teamSize), ...chunk(list.slice(teamSize), teamSize)];
};

const assignMembers = function () {
  const teamNumber = parseInt(displayTeamNbr.textContent);
  const randomisedList = namesList.sort(() => Math.random() - 0.5);
  const teamSize = Math.round(randomisedList.length / teamNumber);
  let chunkedLists = chunk(randomisedList, teamSize);
  if (chunkedLists.length > teamNumber) {
    const remainders = chunkedLists[chunkedLists.length - 1];
    chunkedLists = chunkedLists.slice(0, -1);
    for (let i = 0; i < remainders.length; i++) {
      chunkedLists[i].push(remainders[i]);
    }
  }
  return chunkedLists;
};

assignIntoTeams.addEventListener("click", () => {
  if (namesList.length === 0) {
    return;
  }
  const assignedTeams = assignMembers();
  showTeamOnScreen(assignedTeams);
});

const showTeamOnScreen = function (assignedTeams) {
  for (let i = 0; i < assignedTeams.length; i++) {
    const teamMembers = assignedTeams[i];
    displayTeam(teamMembers, i + 1);
  }
};
const displayTeam = function (teamMembers, teamNumber) {
  const teamInfos = document.createElement("div");
  teamInfos.classList.add("team-design");

  const teamTitle = document.createElement("h1");
  teamTitle.textContent = "Team";

  const teamCounter = document.createElement("span");
  teamInfos.classList.add("team-counter");
  teamCounter.innerText = teamNumber;

  const teamContent = document.createElement("div");
  teamInfos.classList.add("team-content");

  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i];
    const liName = document.createElement("li");
    liName.textContent = member;
    liName.classList.add("li-style");
    teamContent.appendChild(liName);
  }

  teamTitle.appendChild(teamCounter);
  teamInfos.appendChild(teamTitle);
  teamInfos.appendChild(teamContent);

  teamPlacement.appendChild(teamInfos);
};
