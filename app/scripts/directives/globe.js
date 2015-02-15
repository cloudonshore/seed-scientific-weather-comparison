'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:globe
 * @description
 * # globe
 */
angular.module('weatherApp')
  .directive('globe',['$http', '$timeout',function ($http,$timeout) {
    return {
      template: '<div id="globe-container"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
            if(!Detector.webgl){
              Detector.addGetWebGLMessage();
            } else {
              var container = document.getElementById('globe-container');
              //create new globe object
              var globe = new DAT.Globe(container);
              //initialize
              
              globe.animate();
              scope.$on('create-city-sprite', function(event, city) {
                  globe.addSprite('../images/'+city.weather[0].icon+'.png', city.coord.lat,city.coord.lon,false);
                  globe.moveToPoint(city.coord.lat,city.coord.lon);
              });
              scope.$on('globe-focus-city', function(event, city) {
                  globe.moveToPoint(city.coord.lat,city.coord.lon);
              });
              
           }
             
      }
    };
  }]);


//lat:  lon: 
//src=