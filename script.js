var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchButton = document.querySelector("button");
var weatherOverview = document.getElementById("weather-overview");
var weatherForecast = document.getElementById("weather-forecast");

var citySearched;
var APIKey = "33e3e07579a24a43082a28f667d64818";

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
  };
  


/////////////////////////////

var getCities = function (name) {
    console.log("Hello there!");

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

            weatherOverview.innerHTML = weatherOverviewContent;
           



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

            var weatherOverviewContentTwo = `
           
            <p>Temperature: ${data.current.temp}°F</p>
            <p>Wind: ${data.current.wind_speed} MPH</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>UV Index: ${data.current.uvi}</p>
            `;

            weatherForecast.innerHTML = weatherOverviewContentTwo;
   
           ////////////////////

         for (var i = 0; i < data.daily.length; i++) {

            //Do variable = data.daily++
            //Then create the card with template literal. 
            
             console.log("Humidity: " + data.daily[i].humidity);
         }

        });
}



//////////////////////////////
// Form Submission
searchForm.addEventListener('submit', formSubmit);




