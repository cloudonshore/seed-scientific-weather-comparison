'use strict';
/* jshint ignore:start */
/**
 * @ngdoc service
 * @name weatherApp.cities
 * @description
 * # cities
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('cities',['$http','$q','$rootScope','errorHandler','$timeout','usSpinnerService',function ($http,$q,$rootScope,errorHandler,$timeout,usSpinnerService) {
    var that = this;
    this.colors = {} //used to store d3 colors generated in d3Bars for use in cityList
    this.cities = [{id:5128581},{id:2643743}];
    this.initializeCityData = function(){
      
       var graphPromises = [];
       var cityPromises = [];
       var d = new Date();
       var jTime = d.getTime();
       var endTime =  Math.floor(parseInt(jTime)/1000);
       var startTime = Math.floor((parseInt(jTime)- 24*60*60*1000* 5)/1000); 
       var promise;
       angular.forEach(that.cities,function(city){
          if(!city.history)
          {
            /* old url: 
	           short url: 'http://api.openweathermap.org/data/2.5/history/city?id='+city.id+'&type=hour&APPID=b8dd231935128177b587fcf565d4711f&callback=JSON_CALLBACK' */
	          usSpinnerService.spin('graph-spinner');
	          promise = $http.jsonp('http://api.openweathermap.org/data/2.5/history/city?id='+city.id+'&type=hour&start='+startTime+'&end='+endTime+'&APPID=b8dd231935128177b587fcf565d4711f&callback=JSON_CALLBACK').
	          success(function(data) {
	           // console.log(data);
	            city.history = data.list;
	          }).
	          error(function () {
	            errorHandler.displayError();
	          });
	          graphPromises.push(promise);
          }
          if(!city.cityData)
          {
            promise = $http.jsonp('http://api.openweathermap.org/data/2.5/weather?id='+city.id+'&APPID=b8dd231935128177b587fcf565d4711f&callback=JSON_CALLBACK').
            success(function(data) {
              //console.log(data);
              city.cityData = data;
               $rootScope.$broadcast('create-city-sprite',data);
            }).
            error(function () {
              errorHandler.displayError();
            });
            graphPromises.push(promise);
            cityPromises.push(promise);
          }
       });
       
       $q.all(graphPromises).then(function() {
            $rootScope.$broadcast('graph-set');
            usSpinnerService.stop('graph-spinner');
         });
       $q.all(cityPromises).then(function() {
            $rootScope.$broadcast('city-set');         });
    };
    
    
   
      this.initializeCityDataStatic = function(){
           $http.get('../scripts/json/cities.json')
                  .then(function(res){
                     that.cities = res.data;  
                     usSpinnerService.stop('graph-spinner'); 
                     $timeout(function(){$rootScope.$broadcast('graph-set');
                     },500);
                     $timeout(function(){$rootScope.$broadcast('city-set');
                     },250);         
                   });
           
      };
  }]);
