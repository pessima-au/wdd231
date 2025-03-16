const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const cards = document.querySelector("#cards");

async function getProphetData() {
  const response = await fetch(url);

  const data = await response.json();

  displayProphets(data.prophets);
}

getProphetData();

function getOrdinal(num) {
  if (num % 100 >= 11 && num % 100 <= 13) {
    return num + "th";
  }
  switch (num % 10) {
    case 1:
      return num + "st";
    case 2:
      return num + "nd";
    case 3:
      return num + "rd";
    default:
      return num + "th";
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");

    const dateOfBirth = document.createElement("p");
    const placeOfBirth = document.createElement("p");
    dateOfBirth.innerText = `Date of Birth: ${prophet.birthdate}`;
    placeOfBirth.innerText = `Place of Birth: ${prophet.birthplace}`;

    fullName.innerText = `${prophet.name} ${prophet.lastname}`;

    portrait.setAttribute("src", `${prophet.imageurl}`);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname} - ${getOrdinal(
        prophet.order
      )} Latter-day President `
    );

    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "240");
    portrait.setAttribute("heigth", "340");
    card.setAttribute("class", "prophet-card");

    card.appendChild(fullName);
    card.appendChild(dateOfBirth);
    card.appendChild(placeOfBirth);
    card.appendChild(portrait);
    cards.appendChild(card);
  });
};

//adding filter buttons
const all = document.querySelector("#all");
const idaho = document.querySelector("#idaho");
const nonus = document.querySelector("#non-us");
const fifteenplus = document.querySelector("#fifteenplus-years");
const tenpluskids = document.querySelector("#tenplus-children");
const ninetyfiveplus = document.querySelector("#lived-95plus");

function getAgeAtDeath(birthdate, deathdate) {
  if (!deathdate) return null;
  const birthYear = new Date(birthdate).getFullYear();
  const deathYear = new Date(deathdate).getFullYear();
  return deathYear - birthYear;
}

const prophetsData = async (filter = "all") => {
  cards.innerHTML = "";
  const response = await fetch(url);
  let data = await response.json();

  let filteredProphets = [...data.prophets];

  switch (filter) {
    case "all":
      break;
    case "idaho":
      filteredProphets = data.prophets.filter(
        (prophet) => prophet.birthplace === "Idaho"
      );
      break;
    case "nonus":
      filteredProphets = data.prophets.filter(
        (prophet) =>
          ![
            "Utah",
            "Vermont",
            "Connecticut",
            "Ohio",
            "Missouri",
            "Idaho",
          ].includes(prophet.birthplace)
      );
      break;
    case "fifteenplus":
      filteredProphets = data.prophets.filter(
        (prophet) => prophet.length >= 15
      );
      break;
      filteredProphets = data.prophets.filter(
        (prophet) => prophet.numofchildren >= 10
      );
      break;
    case "tenpluskids":
      filteredProphets = data.prophets.filter(
        (prophet) => prophet.numofchildren >= 10
      );
      break;
    case "ninetyfiveplus":
      filteredProphets = data.prophets.filter(
        (prophet) => getAgeAtDeath(prophet.birthdate, prophet.death) >= 95
      );
      break;
    default:
      console.log("Unknown filter:", filter);
      console.log("Unknown filter:", filter);
  }
  displayProphets(filteredProphets);
};

//eventListeners
all.addEventListener("click", () => {
  clearButtonClasses();
  all.className = "active";
  prophetsData("all");
});

idaho.addEventListener("click", () => {
  clearButtonClasses();
  idaho.className = "active";
  prophetsData("idaho");
});

nonus.addEventListener("click", () => {
  clearButtonClasses();
  nonus.className = "active";
  prophetsData("nonus");
});

fifteenplus.addEventListener("click", () => {
  clearButtonClasses();
  fifteenplus.className = "active";
  prophetsData("fifteenplus");
});

tenpluskids.addEventListener("click", () => {
  clearButtonClasses();
  tenpluskids.className = "active";
  prophetsData("tenpluskids");
});

ninetyfiveplus.addEventListener("click", () => {
  clearButtonClasses();
  ninetyfiveplus.className = "active";
  prophetsData("ninetyfiveplus");
});

//clear the active class from all buttons
function clearButtonClasses() {
  filterbuttons = document.querySelectorAll("button");
  filterbuttons.forEach((button) => (button.className = ""));
}
