var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchButton = document.querySelector("button");
var weatherOverview = document.getElementById("weather-overview");
var weatherOverviewHeader = document.getElementById("weather-overview-header");
var weatherOverviewInfo = document.getElementById("weather-overview-info");
var weatherForecast = document.getElementById("weather-forecast");
var storedCities = document.getElementById("storedCities");
var searched = document.getElementById("searchedButton");

var uviStatusElement;
var currentUviStatus;

var citySearched;
var APIKey = "9b5bd5072b5140018fb145059240611";

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
    console.log("Invalid input.");
  }
};

//////////////////////////////
// Displays Stored Entries

var formSubmitButton = function (event) {
  // Getting Storage
  var storedCitySearched = JSON.parse(localStorage.getItem("city-clicked"));

  // Printing if there are items stored.
  if (storedCitySearched) {
    storedCities.innerHTML = "";

    for (var i = 0; i < storedCitySearched.length; i++) {
      const storedCityName = document.createElement("button");
      storedCityName.setAttribute("class", "city-buttons");
      storedCityName.textContent = storedCitySearched[i];
      storedCityName.addEventListener("click", function () {
        getCities(storedCityName.textContent);
      });

      storedCities.append(storedCityName);
    }
  }
};

/////////////////////////////
// Getting City Data

var getCities = function (citySearched) {
  var cityURL =
    "https://api.weatherapi.com/v1/current.json?key=" +
    APIKey +
    "&q=" +
    citySearched;

  fetch(cityURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lon = data.location.lon;
      lat = data.location.lat;

      getWeatherData(lat, lon);
    });
};

//////////////////////////////
// Getting Weather Data, and Printing it.

var getWeatherData = function (lat, lon) {
  var weatherURL =
    "https://api.weatherapi.com/v1/forecast.json?key=" +
    APIKey +
    "&q=" +
    lat +
    "," +
    lon +
    "&days=5";

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Setting up icon for current weather.
      var weatherIcon = data.current.condition.icon;
      var iconURL = weatherIcon;

      // Displaying City Name and Current Weather icon
      var weatherOverviewContent = `
      <div id="weather-overview-title">
      <h3>${data.location.name}</h3>
      <img class="weather-icon" src="${iconURL}" alt="current weather icon"/>
      </div>
      `;

      weatherOverviewHeader.innerHTML = weatherOverviewContent;

      // Displaying Current Weather
      var weatherOverviewContent = `
           <div id="weather-overview-brief">
            <p>Temperature: ${data.current.temp_f}°F</p> <!-- Adjust based on actual response structure -->
            <p>Wind: ${data.current.wind_mph} MPH</p> <!-- Adjust based on actual response structure -->
            <p>Humidity: ${data.current.humidity}%</p> <!-- Adjust based on actual response structure -->
            <p>UV Index: <span class="current-uvi-status" data-cuvi="${data.current.uv}">${data.current.uv}</span></p> <!-- Adjust based on actual response structure -->
            </div>
            `;

      weatherOverviewInfo.innerHTML = weatherOverviewContent;

      // 5-day Forecast Cards
      for (var i = 0; i < data.forecast.forecastday.length; i++) {
        if (i === 5) {
          break;
        }

        // Setting up icon for daily weather.
        var dailyWeatherIcon = data.forecast.forecastday[i].day.condition.icon;
        var dailyIconURL = dailyWeatherIcon;

        // Formatting date
        var day = moment(data.forecast.forecastday[i].date).format("ll");

        // Displaying 5-day weather forecast
        weatherForecastCards += `
              <div class="card-flex">
              <div class="forecast-cards">
              <img class="daily-forecast-icon" src="${dailyIconURL}" alt="current weather icon"/>
              <p class="day">${day}</p>
              <p>Temp: ${data.forecast.forecastday[i].day.avgtemp_f}°F</p> <!-- Adjust based on actual response structure -->
              <p>Wind: ${data.forecast.forecastday[i].day.maxwind_mph} MPH</p> <!-- Adjust based on actual response structure -->
              <p>Humidity: ${data.forecast.forecastday[i].day.avghumidity}%</p> <!-- Adjust based on actual response structure -->
              <p>UVI: <span class="uvi-status" data-uvi="${data.forecast.forecastday[i].day.uv}">${data.forecast.forecastday[i].day.uv}</span></p> <!-- Adjust based on actual response structure -->
              </div>
              </div>
              `;

        weatherForecast.innerHTML = weatherForecastCards;
      }

      weatherForecastCards = "";
      uviStatus();
      uviStatusCurrent();
    });
};

//////////////////////////
// UV Index Status

function uviStatus() {
  uviStatusElement = document.querySelectorAll(".uvi-status");

  uviStatusElement.forEach((uviStatusElement) => {
    if (
      uviStatusElement.dataset.uvi >= 0 &&
      uviStatusElement.dataset.uvi <= 2.99
    ) {
      uviStatusElement.setAttribute(
        "style",
        "color: white; background-color:#92BFB1;padding: 5px; border-radius:5px;"
      );
    } else if (
      uviStatusElement.dataset.uvi >= 3 &&
      uviStatusElement.dataset.uvi <= 5.99
    ) {
      uviStatusElement.setAttribute(
        "style",
        "background-color:#F5E960; padding: 3px 5px; border-radius:5px;"
      );
    } else if (
      uviStatusElement.dataset.uvi >= 6 &&
      uviStatusElement.dataset.uvi <= 7.99
    ) {
      uviStatusElement.setAttribute(
        "style",
        "color: white; background-color:#cd6531; padding: 5px; border-radius:5px;"
      );
    } else {
      uviStatusElement.setAttribute(
        "style",
        "color: white; background-color:#D72638; padding: 5px; border-radius:5px;"
      );
    }
  });
}

//////////////////////////
//Current UVI Status

function uviStatusCurrent() {
  currentUviStatus = document.querySelectorAll(".current-uvi-status");

  currentUviStatus.forEach((currentUviStatus) => {
    if (
      currentUviStatus.dataset.cuvi >= 0 &&
      currentUviStatus.dataset.cuvi <= 2.99
    ) {
      currentUviStatus.setAttribute(
        "style",
        "color: white; background-color:#92BFB1;padding: 5px; border-radius:5px;"
      );
    } else if (
      currentUviStatus.dataset.cuvi >= 3 &&
      currentUviStatus.dataset.cuvi <= 5.99
    ) {
      currentUviStatus.setAttribute(
        "style",
        "background-color:#F5E960; padding: 3px 5px; border-radius:5px;"
      );
    } else if (
      currentUviStatus.dataset.cuvi >= 6 &&
      currentUviStatus.dataset.cuvi <= 7.99
    ) {
      currentUviStatus.setAttribute(
        "style",
        "color: white; background-color:#cd6531; padding: 5px; border-radius:5px;"
      );
    } else {
      currentUviStatus.setAttribute(
        "style",
        "color: white; background-color:#D72638; padding: 5px; border-radius:5px;"
      );
    }
  });
}

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
