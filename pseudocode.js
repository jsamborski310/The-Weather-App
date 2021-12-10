///////////////////////////////////////////////////////////////

var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchButton = document.querySelector("button");
var weatherOverview = document.getElementById("weather-overview");
var weatherOverviewHeader = document.getElementById("weather-overview-header");
var weatherOverviewInfo = document.getElementById("weather-overview-info");
var weatherForecast = document.getElementById("weather-forecast");
var storedCities = document.getElementById("storedCities");
var searched = document.getElementById("searchedButton");

var citySearched;
var APIKey = "33e3e07579a24a43082a28f667d64818";

var weatherForecastCards = "";

//////////////////////////////////////////
// City Search Form

var formSubmit = function (event) {
  event.preventDefault();

  citySearched = searchInput.value.trim();

  //Setting it to store in a later function.
  storeCitySearched(citySearched);

  if (citySearched) {
    getCities(citySearched);

    //Clearing the input.
    searchInput.value = "";

    formSubmitButton(event);
  } else {
    //   alert('Please enter a city name.');
  }
};
/////////////////////////////

// Displays Stored Entries --------------------------
var formSubmitButton = function (event) {
  // event.preventDefault();

  console.log("event: " + event);

  // Getting Storage
  var storedCitySearched = JSON.parse(localStorage.getItem("city-clicked"));

  if (storedCitySearched) {
      storedCities.innerHTML="";
      
    for (var i = 0; i < storedCitySearched.length; i++) {
      const storedCityName = document.createElement("button");
      storedCityName.textContent = storedCitySearched[i];
      storedCityName.addEventListener("click", function () {

        console.log(storedCityName.textContent);
        getCities(storedCityName.textContent);
      });
      

    //   const cityName = event.target.getAttribute("data-cities");
      storedCities.append(storedCityName);

    //   console.log("city name: " + cityName);
    }

    // getCities(citySearched);
    // storedCities.innerHTML += storedCityName;
    // document.getElementById(citySearched).addEventListener("click", function(){getCities(citySearched)});
  }
};

/////////////////////////////
// Getting City Data

var getCities = function (citySearched) {
  var cityURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearched +
    "&units=imperial&appid=" +
    APIKey;

  fetch(cityURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Add if/else statement here. If name=citySearched, the do this, otherwise, print an error message.

      // name = citySearched;

      lon = data.coord.lon;
      lat = data.coord.lat;

      var weatherOverviewContent = `
            <h3>${citySearched}</h3>
            `;

      weatherOverviewHeader.innerHTML = weatherOverviewContent;

      getWeatherData(lat, lon);
    });

  ////////////////////////
};

////////////////////////

var getWeatherData = function (lat, lon) {
  var weatherURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var weatherOverviewContent = `
           
            <p>Temperature: ${data.current.temp}°F</p>
            <p>Wind: ${data.current.wind_speed} MPH</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>UV Index: ${data.current.uvi}</p>
            `;

      weatherOverviewInfo.innerHTML = weatherOverviewContent;

      ////////////////////

      for (var i = 0; i < data.daily.length; i++) {
        if (i === 5) {
          break;
        }

        var day = moment(data.daily[i].dt * 1000).format("L");

        weatherForecastCards += `
              <div class="forecast-cards">
              <p>Date: ${day}</p>
              <p>Temperature: ${data.daily[i].temp.day}°F</p>
              <p>Wind: ${data.daily[i].wind_speed} MPH</p>
              <p>Humidity: ${data.daily[i].humidity}%</p>
              </div>
              `;

        weatherForecast.innerHTML = weatherForecastCards;
      }
      weatherForecastCards = "";
    });
};

//////////////////////////
// Saving Cities Searched

var citiesArray = [];

function storeCitySearched(citySearched) {
  citiesArray.push(citySearched);

  localStorage.setItem("city-clicked", JSON.stringify(citiesArray));
}

//////////////////////////////
// Form Submission
searchForm.addEventListener("submit", formSubmit);

// cityName.addEventListener('click', formSubmitButton);
