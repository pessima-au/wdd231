import { places } from "../data/places.js";


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


//Display places
function displayPlaces() {
  const cards = document.querySelector("#places");
  console.log(places);
  //loop
  places.forEach((place) => {
    const placeDiv = document.createElement("div");
    placeDiv.className = "place";
    cards.appendChild(placeDiv);

    const photo = document.createElement("img");
    photo.src = `${place.photo_url}`;
    photo.alt = `${place.name}`;
    placeDiv.appendChild(photo);

    const header = document.createElement("h2");
    header.textContent = `${place.name}`;
    placeDiv.appendChild(header);

    const location = document.createElement("address");
    location.textContent = `${place.address}`;
    placeDiv.appendChild(location);

    const description = document.createElement("p");
    description.innerText = `${place.description}`;
    placeDiv.appendChild(description);
  });
}

displayPlaces();

//Last Visit
const lastVisit = Number(localStorage.getItem("lastVisit"));
const sidebar = document.querySelector(".sidebar");
const messageArea = document.querySelector("#sidebar-message");
const closeButton = document.querySelector(".close-button");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const today = Date.now();
const messageContainer = document.getElementById("message-container");
const chatMessages = document.getElementById("chat-messages");

function timeBetween(today, lastVisit) {
    const msToDays = 1000 * 60 * 60 * 24;
    const daySince = Math.floor((today - lastVisit) / msToDays);
    return daySince;
}

if (!lastVisit) {
    messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
    let daySince = timeBetween(today, lastVisit);
    if (daySince < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
    } else if (daySince === 1) {
        messageArea.textContent = `You last visited ${daySince} day ago.`;
    } else {
        messageArea.textContent = `You last visited ${daySince} days ago.`;
    }
}

localStorage.setItem("lastVisit", today);

setTimeout(() => {
    sidebar.style.display = "none";
}, 10000);

closeButton.addEventListener("click", function () {
    sidebar.style.display = "none";
});

//sending messages
sendButton.addEventListener("click", function () {
    const message = chatInput.value.trim();
    if (message) {
        displayMessage("You: " + message);
        chatInput.value = ""; 
    }
});

function displayMessage(text) {
    const msgElement = document.createElement("p");
    msgElement.textContent = text;
    chatMessages.appendChild(msgElement);
}