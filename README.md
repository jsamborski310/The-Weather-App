# The-Weather-App

## Overview

Program a weather application so that a traveler may view weather information for various cities around the world so they may plan a trip accordingly.  


## The Project

The weather app was built using the tools listed below. An API was utlized in order to obtained weather information from cities around the world. This information includes the current weather as well as the 5 day forecast. The travler will be informed of the temperature, wind, humidity, and uv index. Weather icons make it easy for the traveler to understand weather conditions at a glance. Background colors on uv index visually alert the traveler of the risk of uv exposure, ranging from low to extreme, so they may protect themself.

When a travler searches for a city, the application stores all of the previous cities searched so they can easily navigate back and forth when working thorugh a travel plan. 
 

## Tools

* Javascript
* HTML
* CSS
* Bootstrap
* Open Weather API
* Momentjs


## Road Blocks

Before beginning the project, I began thinking through the requirements and writing out pseudocode. Based on my current understanding of javascript and APIs, there were a few things I knew I needed to include in the application's code: 

* An open API that would allow me to tap into a database containing weather information for cities around the world.
* Momentjs to format the date provided by the API.
* Local storage to save the travelers search history.
* If/else statements for the uv index flags.
* A loop for the 5-day weather forecast.


Seemed simple enough, but alas, while I was quickly coding the application, I ran into a bump in the road. By this time, I had created template literals to display current weather information, the 5-day forecast, and the search history buttons: 


- The buttons, when clicked, were not displaying the weather information for the specific city selected. 


## Template Literals & Event Listeners 

Turns out, event listeners and template literals don't work well together. I learned this the hard way, after many hours and help from several people. Alas, a very knowledgable learning assistant turned on the light and I found my way to this:

```
if (storedCitySearched) {
      storedCities.innerHTML="";
      
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
```

## Neat Trick

During testing, I noticed I was typing the names of cities in lowercase. Because the user imput is then displayed as the city, I did not care for the name being lowercased. I searched for ways to automatically force the first letter in the word to be capitalized, but creating a long string of `toUpperCase` and `toLowerCase` wasn't the type of solution I was looking for. I wanted something simple. 

Then it hit me...I can do this in CSS with this simple line: `text-transform:capitalize;`. Simplicity at its best!


## That's a wrap

After some trial and error, office hours attendance, Googling, tutoring and studying, the code locked into place and the application operates as per the requirements.  


## Take a Look

GitHub: https://github.com/jsamborski310/The-Weather-App

GitHub Pages: https://jsamborski310.github.io/The-Weather-App/


## The Preview

Here's a live screencast of the daily planner in action: 

https://www.loom.com/share/dd88f8fd3a0d42ce8f6662433dbc6e04


###### Daily Planner


![Screen shot of the daily planner.](Assets/images/Daily-Planner.png)


###### Daily Planner with Plans


![Screen shot of the daily planner with plans.](Assets/images/Daily-Planner-With-Plans.png)
