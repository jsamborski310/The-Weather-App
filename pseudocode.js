  // Use template literals. 
  // At first, only the form appears until the user enters a city name. So everything will need to be done onclick. 

  //////////////////////////////
  //--------->
  // TO DO
  // Add jQuery extension to pre-fill text
  //--------->
  //////////////////////////////


// Button function to get the city to then pass through to the geoData function. 

// From the <form> element, listen to the "submit"
//From the <button> element, listen to the "click"

    //Select <input>, get its value, and provide it to the geo API

// From the <button. container element, listen to the <button "click"

    // Get the city from the button's data attribute. 

// Fetch the geo data (lat, lon)

function geoData(cityName) {

    var url = `http://api.com;`

    fetch( url )
        .then(function(response) {
            return response.json(); //Pulls out response data as a string.
        })
        .then( function (data) {
            //console.log(data);
            oneCall(/*Provide lat and lon here*/); //Call oneCall function here. 
        });

}

    // q = Name of the city
    // limit = 5 (optional)
    // appid = Your custom AI key


    //Fetch the one call weather data

    function oneCall(lat, lon) {

        var url = `http://api.com;`
    
        fetch( url )
            .then(function(response) {
                return response.json(); //Pulls out response data as a string.
            })
            .then( function (data) {
                //console.log(data);

                // Render to the page.
            });
    
    }

  


    // lat
    // lon
    //appid
    // units = imperial
    // exclude

    // Print/Render to the page function.
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

var weatherForecastCards = '';

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
    searchInput.value = '';

 


    } else {
    //   alert('Please enter a city name.');
    }
}
/////////////////////////////


 // Displays Stored Entries --------------------------
 var formSubmitButton = function (event) {

    // event.preventDefault();

 console.log("event: " + event);

    // Getting Storage
    var storedCitySearched = JSON.parse(localStorage.getItem("city-clicked"));

    if(storedCitySearched) {
    
            for( var i = 0; i < storedCitySearched.length; i++) {

               
                storedCityName = `
                <button id="searchedButton" data-cities="${citySearched}">${citySearched}</button>
                `;
        
                const cityName = event.target.getAttribute("data-cities");
               
                console.log("city name: " + cityName);
                
                getCities(cityName);
                
            }


            storedCities.innerHTML += storedCityName;
                    
            
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
                   
            getWeatherData(lat, lon); 
        
        });
            
                
            ////////////////////////          
        
};



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


var citiesArray = [];

function storeCitySearched(citySearched) {
 
    citiesArray.push(citySearched);

    localStorage.setItem("city-clicked", JSON.stringify(citiesArray));
           
};


//////////////////////////////
// Form Submission
searchForm.addEventListener('submit', formSubmit);

storedCities.addEventListener('click', formSubmitButton);

