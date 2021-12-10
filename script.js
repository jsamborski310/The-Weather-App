var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchButton = document.querySelector("button");
var weatherOverview = document.getElementById("weather-overview");
var weatherOverviewHeader = document.getElementById("weather-overview-header");
var weatherOverviewInfo = document.getElementById("weather-overview-info");
var weatherForecast = document.getElementById("weather-forecast");
var storedCities = document.getElementById("storedCities");

var citySearched;
var APIKey = "33e3e07579a24a43082a28f667d64818";

var weatherForecastCards = '';

//////////////////////////////////////////
// City Search Form

var formSubmit = function (event) {
    event.preventDefault();
  
    citySearched = searchInput.value.trim();
  
    if (citySearched) {
    getCities(citySearched);
    
    //Clearing the input.
    searchInput.value = '';

    } else {
    //   alert('Please enter a city name.');
    }
}
  

/////////////////////////////
// Getting City Data

var getCities = function (name) {
   
    var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&units=imperial&appid=' + APIKey;
   
    fetch( cityURL )
        .then(function(response) {
            return response.json(); 
        })
        .then( function (data) {

            //Add if/else statement here. If name=citySearched, the do this, otherwise, print an error message.

            name = citySearched;

            lon = data.coord.lon;
            lat = data.coord.lat;

            var weatherOverviewContent = `
            <h3>${name}</h3>
            `;

            weatherOverviewHeader.innerHTML = weatherOverviewContent;
           

  // Displays Stored Entries --------------------------
 
            // Getting stored entries to display.
            var storedCitySearched = localStorage.getItem("city-clicked");

            console.log("stored city: " + storedCitySearched);
            // If user enters text, it's saved to the corresponding row. 
            if(storedCitySearched) {
                
                // storedCities.innerHTML = storeCitySearched;
            };
            ////////////////////////

            getWeatherData(lat, lon); 
        
        });

}

////////////////////////


var getWeatherData = function (lat, lon) {
   
    var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + APIKey;


    fetch( weatherURL )
        .then(function(response) {
            return response.json(); 

        })
        .then( function (data) {

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

              var day = moment(data.daily[i].dt * 1000).format('L')
              
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
            weatherForecastCards ='';
             
        });

}

//////////////////////////
// Saving Cities Searched

function storeCitySearched(event) {
 
    event.preventDefault();

    localStorage.setItem("city-clicked", citySearched);
           
};

//////////////////////////////
// Form Submission
searchForm.addEventListener('submit', formSubmit);
// storedCities.addEventListener('click', formSubmit);
