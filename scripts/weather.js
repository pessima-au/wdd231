const currentWeather = document.querySelector("#current-temp");
const icon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcap");
const city = document.querySelector(".city");

const humidity = document.querySelector(".humidity");
const maximum = document.querySelector(".max");
const minimum = document.querySelector(".min");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=8.49&lon=-13.23&units=metric&appid=a8a562781389c7938f0d5c0cdb05cf20";

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(await response.data);
    }

    const data = await response.json();
    console.log(data);

    displayInfo(data);
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayInfo(data) {
    city.textContent = `${data.name}`;
    currentWeather.textContent = `${data.main.temp}°C`;
    let description = data.weather[0].description;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    icon.setAttribute("src", iconSrc);
    icon.setAttribute("alt", description);
    captionDesc.textContent = `${description}`;
    
    humidity.textContent = `Humidity: ${data.main.humidity}`;
    maximum.textContent = `Maximum: ${data.main.temp_max}`;
    minimum.textContent = `Minimimum: ${data.main.temp_min}`
    
}