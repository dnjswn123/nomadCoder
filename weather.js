const API_KEY = "48b2a389dda52c0b0bfa2f28c7192483";

function onGeoOkay(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather #city");
      const country = document.querySelector("#weather span:last-child");
      weather.innerText = data.weather[0].main;
      city.innerText = data.name;
      country.innerText = data.sys.country;
    });
}

function onGeoError() {
  alert("I can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
