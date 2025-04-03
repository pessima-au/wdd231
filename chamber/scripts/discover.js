import { places } from "../data/places.js";

function displayPlaces() {
    const cards = document.querySelector('#places');
    console.log(places);
    //loop
    places.forEach(place => {
        const placeDiv = document.createElement("div");
        placeDiv.className = "place";
        cards.appendChild(placeDiv);


        placeDiv.innerHTML = `
        <h3 class="${place.name}">${place.name}</h3>
        <img src="${place.photo_url}" alt="${place.name}">
        <address>${place.address}</address>
        <p>${place.description}</p>
        
        `
        
    })

}

displayPlaces()