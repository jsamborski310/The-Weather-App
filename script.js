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
  
      weatherOverview.textContent = citySearched;
      
      //Clearing the input.
      searchInput.value = '';

    } else {
    //   alert('Please enter a city name.');
    }
  };
  


/////////////////////////////

var getCities = function (name) {
    console.log("Hello there!");

    var cityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=' + APIKey;
   

    fetch( cityURL )
        .then(function(response) {
            return response.json(); 

        })
        .then( function (data) {

            name = citySearched;
            weatherForecast.textContent = name;
           
            lon = data.coord.lon;
            lat = data.coord.lat;
           

            console.log("Name: " + name);
            console.log("City Searched: " + citySearched);
            console.log("latitude:" + name.lat);
            console.log("latitude 3:" + data.lat);
            // console.log("Data: " + data);


            getWeatherData(); 
        });
        
}



////////////////////////

var getWeatherData = function (lat, lon) {
    console.log("Hi there!");

    var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;


    fetch( weatherURL )
        .then(function(response) {
            return response.json(); 

        })
        .then( function (data) {

        
            // lat = ['coord']['lat'];
            // lon = ['coord']['lon'];

            weatherForecast.textContent = lat, lon;
           
            console.log("lat: " + lat);
            console.log("lat: " + lon);
            console.log("Data 2: " + data);

        });
}



//////////////////////////////
// Form Submission
searchForm.addEventListener('submit', formSubmit);



