const currentWeather = document.querySelector("#current-temp");

const icon = document.querySelector("#weather-icon");

const captionDesc = document.querySelector("figcaption");

// icon.setAttribute('src', '');
// icon.setAttribute('alt', )

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=a8a562781389c7938f0d5c0cdb05cf20";

async function apiFetch() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.log(`${error}`);
  }
}
apiFetch();

function displayResults(data) {
  currentWeather.textContent = `${data.main.temp}°C`;
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let description = data.weather[0].description;
  icon.setAttribute("src", iconSrc);
  icon.setAttribute("alt", description);
  captionDesc.textContent = `${description}`;
}
