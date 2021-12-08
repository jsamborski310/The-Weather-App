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

