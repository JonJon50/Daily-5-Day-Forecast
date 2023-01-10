var searchedCities = [];

var formEl = document.querySelector('#form-id');
var inputEl = document.querySelector('#input-id');
var myApiKey = "eb177e92d9d9eb35b3a16c1624694622";
var todayDiv = document.querySelector('#today-id');
var forecastDiv = document.querySelector('#forecast-id');
formEl.addEventListener('submit', handleSearch);

function handleSearch(e) {
  // Don't continue if there is nothing in the search form
  if (!inputEl.value) {
    return;
  }

  e.preventDefault();
  var city = inputEl.value.trim();
  console.log("city = ", city);
  fetchGeoCoords(city);
  inputEl.value = '';
}

function fetchGeoCoords(city){
  // tbd
  let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${myApiKey}`;
  fetch(geoUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("data= ", data);
      addToSearchedCities(city);
      fetchWeatherForcast(data[0],city);
    })
    .catch(function(error){
      console.error(error);
    });
}
function addToSearchedCities(city){
  // tbd
}

function fetchWeatherForcast(data, city){
  // tbd
  let {lat} = data;
  let {lon} = data;
  let forcastUrl= `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}`;
  fetch(forcastUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("data= ", data);
      displayWeather(city, data);
      
    })
    .catch(function(error){
      console.error(error);
    });
}
function displayWeather(city, data) {
  console.log("tbc");
  let temp= data.list[0].main.temp;
  let wind= data.list[0].wind.speed;
  let humidity= data.list[0].main.humidity;
  let iconUrl = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
  let iconDescription = data.list[0].weather[0].description || data.list[0].main;
  console.log(temp, wind, humidity, iconDescription, iconUrl)
  let card = document.createElement('div');
  let cardBody = document.createElement('div');
  let heading = document.createElement('h2');
  let weatherIcon = document.createElement('img');
  let tempEl = document.createElement('p');
  let windEl = document.createElement('p');
  let humidityEl = document.createElement('p');

  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);

  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${temp}°F`;
  windEl.textContent = `Wind: ${wind} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(heading, tempEl, windEl, humidityEl);

  todayDiv.innerHTML = '';
  todayDiv.append(card);
}