'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:globe
 * @description
 * # globe
 */
angular.module('weatherApp')
  .directive('globe',[function () {
    return {
      restrict: 'A',
      link: function postLink(scope) {
            if(window.Detector && !window.Detector.webgl){
              window.Detector.addGetWebGLMessage();
            } else {
              var container = document.getElementById('globe-container');
              //create new globe object
              var globe = new window.DAT.Globe(container);
              //initialize
              
              globe.animate();
              scope.$on('create-city-sprite', function(event, city) {
                  globe.addSprite(city.id,'images/'+city.weather[0].icon+'.png', city.coord.lat,city.coord.lon,false);
                  globe.moveToPoint(city.coord.lat,city.coord.lon);
              });
              scope.$on('remove-city-sprite', function(event, city) {
                  globe.removeSprite(city.id);
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