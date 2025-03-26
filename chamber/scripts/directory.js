document.addEventListener("visibilitychange", () => {
  if (document.hidden && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
});


// Last Modified Date
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// Current Year
document.querySelector("#currentYear").textContent = new Date().getFullYear();

// Mobile Menu
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("active");
  hamButton.classList.toggle("open");
});

// View Toggle
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const cards = document.querySelector("#cards");

gridButton.addEventListener("click", () => {
  cards.classList.add("grid");
  cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
  cards.classList.add("list");
  cards.classList.remove("grid");
});

// Dark Mode Toggle
const themeToggle = document.querySelector("#theme");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggle.classList.toggle("active");
});

// Fetch Members Data
async function getCompanies() {
  try {
    const response = await fetch("./data/members.json");
    const data = await response.json();
    displayCompanies(data);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayCompanies(companies) {
  const cards = document.querySelector("#cards");

  companies.forEach((company) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <h2>${company.name}</h2>
            <img src="${company.image}" alt="${company.name}" width="320" height="200">
            <p class="card-address">${company.address}</p>
            <p class="phone">${company.phone}</p>
            <a href="${company.website}" target="_blank" class="website">Visit Website</a>
            <p class="membership">Membership Level: ${company.membershipLevel}</p>
        `;

    cards.appendChild(card);
  });
}

// Initialize
getCompanies();
