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
      fetchWeatherForcast(data[0]);
    })
    .catch(function(error){
      console.error(error);
    });
}
function addToSearchedCities(city){
  // tbd
}

function fetchWeatherForcast(data){
  // tbd
  let {lat} = data;
  let {lon} = data;
  let forcastUrl= `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}`;
}