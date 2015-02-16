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
       errorHandler.errors.hasError = false;
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
            /* old url: 'http://api.openweathermap.org/data/2.5/history/city?id='+city.id+'&type=hour&start='+startTime+'&end='+endTime+'&APPID=b8dd231935128177b587fcf565d4711'
	           short url:  */
	          usSpinnerService.spin('graph-spinner');
	          if(that.static)
	          {
	            if([5128581,2643743].indexOf(city.id) >=0)
	            {
	            promise = $http.get('../scripts/json/'+city.id+'.json')
	                   .then(function(res){
	                      console.log(res);
	                      city.history = res.data;  
	                      usSpinnerService.stop('graph-spinner');         
	                    });
	            graphPromises.push(promise);
	           }
	           else {
	           	city.history = [];
	           }
	          }
	          else {
	           // promise = $http.jsonp('http://api.openweathermap.org/data/2.5/history/city?id='+city.id+'&type=hour&start='+startTime+'&end='+endTime+'&APPID=b8dd231935128177b587fcf565d4711').
	          	promise = $http.jsonp('http://api.openweathermap.org/data/2.5/history/city?id='+city.id+'&type=hour&APPID=b8dd231935128177b587fcf565d4711f&callback=JSON_CALLBACK').
	          	success(function(data) {
	          	 // console.log(data);
	          	  city.history = data.list;
	          	}).
	          	error(function (result) {
	          	  
	          	  errorHandler.displayError(result);
	          	});
	          	graphPromises.push(promise);
	          }

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
            $rootScope.$broadcast('city-set'); 
       });
       if(cityPromises.length===0) //when change from live data to static data, no promises are created, but the city data must still be set in the citylist by this broadcast
       {
         $rootScope.$broadcast('city-set'); 
       }
    };
    
    this.deleteCity = function(id){
      that.cities = that.cities.filter(function( obj ) {
          return obj.id !== id;
      });
      $rootScope.$broadcast('city-set');
      $rootScope.$broadcast('graph-set');
      $rootScope.$broadcast('remove-city-sprite',{id:id});
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
