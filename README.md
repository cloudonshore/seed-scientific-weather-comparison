# Weather Comparison for Seed Scientific

 
## Technologies used
  * SCSS
  * AngularJs
  * Yeoman Angular generator
  * grunt
  * D3.js
  * Three.js
  * bootstrap

## Process 
 I looked through the Open Weather API to see what kind of data it provided, and decided to build an app that compared both current and historical weather data in New York and London. I also wanted the ability to add new cities, and to have a visual reference for comparing their physical locations (globe). <br/><br/>
 I used the Yeoman Angular generator to scaffold out my application, directives, services, filters, and controllers. I set up my core data model to be a list of cities (services/cities.js). I created two directives, one for comparing current city data (directives/citylist.js), and one for comparing historical data using the D3 graphic library (directives/d3Bar.js). I also built a directive for displaying a 3D globe (directives/globe.js) using the webGL javascript library Three.js. <br/><br/>
 The API server periodically has difficulty returning historical data (the server would respond to my requests with 500, 510, and 511 errors), and so I created an additional version of the app that uses a local JSON file of historical weather data for New York and London (navigate to [app root]/static to see the static version).  <br/><br/>

## To view online
go to http://cloudonshore.com/weathercomparison/

## To view locally
Download zip and run `grunt serve` in the local directory.


