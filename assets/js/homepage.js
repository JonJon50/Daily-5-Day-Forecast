var searchedCities = [];

var formEl = document.querySelector('#form-id');
var inputEl = document.querySelector('#input-id');
var myApiKey = "eb177e92d9d9eb35b3a16c1624694622";
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
}