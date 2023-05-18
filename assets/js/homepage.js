var searchedCities = [];
// variables in DOM API
var formEl = document.querySelector('#form-id');
var inputEl = document.querySelector('#input-id');
var myApiKey = "eb177e92d9d9eb35b3a16c1624694622";
var todayDiv = document.querySelector('#today-id');
var forecastDiv = document.querySelector('#forecast-id');
var historyDiv = document.querySelector("#history-id");
formEl.addEventListener('submit', handleSearch);
historyDiv.addEventListener('click', handleHistoryClick);
// parse for local storage 
function init() {
  var storedCities = localStorage.getItem('search-history');
  if (storedCities) {
    searchedCities = JSON.parse(storedCities);
  }
  displaySearchHistory();
}

function handleHistoryClick(e) {
  // Don't do search if current elements is not a search history button
  if (!e.target.matches('.btn-history')) {
    return;
  }
  var btn = e.target;
  var search = btn.getAttribute('data-search');
  fetchGeoCoords(search);
}

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
/* applying data weather key with fetch method */
function fetchGeoCoords(city){
  // tbd
  let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${myApiKey}`;
  fetch(geoUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("data= ", data);
      addToSearchedCities(city);
      fetchWeatherForecast(data[0], city);
    })
    .catch(function(error){
      console.error(error);
    });
  
}
// city search
function addToSearchedCities(city){
  if (searchedCities.indexOf(city) !== -1) {
    return;
  }
  searchedCities.push(city);
  localStorage.setItem('search-history', JSON.stringify(searchedCities));
  displaySearchHistory();
}
 function displaySearchHistory(){
  historyDiv.innerHTML = "";
  for (var i = searchedCities.length - 1; i >= 0; i--) {
  var btn = document.createElement('button');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-controls', 'today forecast');
  btn.classList.add('history-btn', 'btn-history');
// `data-search` allows access to city name when click handler is invoked
  btn.setAttribute('data-search', searchedCities[i]);
  btn.textContent = searchedCities[i];
  historyDiv.append(btn);
  }
}
// key calling la&lon with unit&imperial apply 
function fetchWeatherForecast(data, city){
  let { lat } = data;
  let { lon } = data;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=imperial`;

  fetch(forecastUrl)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log("data= ", data);
      displayWeather(city, data);
      displayForecast(city, data);
    })
    .catch(function(error){
      console.error(error);
    });
}
function displayWeather(city, data) {
  console.log("tbc");
  let date= data.list[0].dt_txt;
  let temp= data.list[0].main.temp;
  let wind= data.list[0].wind.speed;
  let humidity= data.list[0].main.humidity;
  let iconUrl = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
  let iconDescription = data.list[0].weather[0].description || data.list[0].main;
  console.log(temp, wind, humidity, iconDescription, iconUrl)
  /* creating elements and attributes on HTML */
  let card = document.createElement('div');
  let cardBody = document.createElement('div');
  let heading = document.createElement('h2');
  let weatherIcon = document.createElement('img');
  let tempEl = document.createElement('p');
  let windEl = document.createElement('p');
  let humidityEl = document.createElement('p');
// Creating attributes of class etc..
  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);
  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');
  heading.textContent = `${city} (${date})`;
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
function displayForcast(city, data) {
  let startDt = dayjs().add(1, 'day').startOf('day').unix();
  let endDt = dayjs().add(6, 'day').startOf('day').unix();
  let headingCol = document.createElement('div');
  let heading = document.createElement('h4');
// heading input 
  headingCol.setAttribute('class', 'col-12');
  heading.textContent = '5-Day Forecast:';
  headingCol.append(heading);
  forecastDiv.innerHTML = '';
  forecastDiv.append(headingCol);
/* for loop applied */ 
for (let i = 0; i < data.list.length; i++) {
// First filters through all of the data and returns only data that falls between one day after the current data and up to 5 days later.
      if (data.list[i].dt >= startDt && data.list[i].dt < endDt) {
// Then filters through the data and returns only data captured at noon for each day.
      if (data.list[i].dt_txt.slice(11, 13) == "12") {
        renderForecastCard(data.list[i]);
      }
    }
  } 
}
function renderForecastCard(data){
  var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  var iconDescription = data.weather[0].description;
  var tempF = data.main.temp;
  var humidity = data.main.humidity;
  var windMph = data.wind.speed;
  var col = document.createElement('div');
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h5');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute('class', 'col-md');
  col.classList.add('five-day-card');
  card.setAttribute('class', 'card bg-primary h-100 text-white');
  cardBody.setAttribute('class', 'card-body p-2');
  cardTitle.setAttribute('class', 'card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');
 // add cards 5 day
  cardTitle.textContent = dayjs(data.dt_txt).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastDiv.append(col);
}
init();
