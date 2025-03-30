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

async function getCompanies() {
  try {
    const response = await fetch("./data/members.json");
    if (!response.ok) {
      throw new Error(response.text);
    }
    const data = await response.json();
    displaySpotlights(data);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}
getCompanies();

function displaySpotlights(companies) {
  const spotlightsSection = document.querySelector("#biz-cards");
  const goldAndSilver = companies.filter(
    (company) =>
      company.membershipLevel === "Gold" || company.membershipLevel === "Silver"
  );


  goldAndSilver.sort(() => 0.5 - Math.random());

  
  const numSpotlights = Math.floor(Math.random() * 2) + 2;
  const spotlights = goldAndSilver.slice(0, numSpotlights);

  spotlights.forEach((company) => {
    const card = document.createElement("div");
    card.className = "comp-card";

    card.innerHTML = `
            <div class="card-header">
                <h2>${company.name}</h2>
                <p class="tag-line">${company.tagline}</p>
            </div>
            <hr>
            <div class="card-body">
              <div class="card-image">
                 <img src="${company.image}" alt="${company.name}" width="320" height="200">
                 </div>
                  <div class="card-info">
                      <p class="address"><b>ADDRESS:</b> ${company.address}</p>
                      <p class="phone"><b>PHONE</b>: ${company.phone}</p>
                      <p><b>URL</b>: <a href="${company.website}" target="_blank" class="website">${company.website}</a></p>
                      <p class="membership"><b>LEVEL:</b> ${company.membershipLevel}</p>
                  </div>
              </div>
          </div>
        `;

    spotlightsSection.appendChild(card);
  });
}

const url =
  "https://api.openweathermap.org/data/2.5/forecast?lat=8.49&lon=-13.23&units=metric&appid=a8a562781389c7938f0d5c0cdb05cf20";

async function apiWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

apiWeather();


function displayWeather(data) {
  const current = document.querySelector(".current");

  // The current weather details 
  const currentWeather = data.list[0];
  const iconSrc = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;

  current.innerHTML = `
    <h2>Current Weather</h2>
    <div class="weather-data">
      <img alt="${
        currentWeather.weather[0].description
      }" src="${iconSrc}" class="weather-icon" height="60px" width="auto">
      <div class="info">
        <p>Temperature: ${currentWeather.main.temp}°C</p>
        <p>${currentWeather.weather[0].description}</p>
        <p>High: ${currentWeather.main.temp_max}°C</p>
        <p>Low: ${currentWeather.main.temp_min}°C</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
        <p>Sunrise: ${new Date(
          data.city.sunrise * 1000
        ).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  `;

  // Weather forecast for the next three days 
  const forecast = document.querySelector(".forecast");
  let forecastHTML = "<h2>Weather Forecast</h2>";

  const today = new Date();
  const nextThreeDays = [
    new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0],
    new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0],
    new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0],
  ];


  nextThreeDays.forEach((day) => {
    const forecastData = data.list.find(
      (forecast) =>
        forecast.dt_txt.includes(day) && forecast.dt_txt.includes("12:00:00")
    );
    if (forecastData) {
      forecastHTML += `
        <div class="forecast-item">
          <h3>${new Date(forecastData.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
          })}</h3>
          <p>${forecastData.main.temp}°C</p>
        </div>
      `;
    }
  });

  forecast.innerHTML = forecastHTML;
}
