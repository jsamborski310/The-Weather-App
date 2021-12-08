var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchButton = document.querySelector("button");
var weatherOverview = document.getElementById("weather-overview");

var formSubmit = function (event) {
    event.preventDefault();
  
    var citySearched = searchInput.value.trim();
  
    if (citySearched) {
     // getCities(citySearched);
  
      weatherOverview.textContent = citySearched;
      
      //Clearing the input.
      searchInput.value = '';

    } else {
    //   alert('Please enter a city name.');
    }
  };
  
//  function getCities () {

//  }

/////////////////////////////

function geoData(name) {

    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + name + '&limit=5&appid=33e3e07579a24a43082a28f667d64818'

    fetch( url )
        .then(function(response) {
            return response.json(); 
        })
        .then( function (data) {
            //console.log(data);
            oneCall(/*Provide lat and lon here*/); //Call oneCall function here. 
        });

}





//////////////////////////////
// Form Submission
searchForm.addEventListener('submit', formSubmit);



