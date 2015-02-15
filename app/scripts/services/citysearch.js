'use strict';

/**
 * @ngdoc service
 * @name weatherApp.citySearch
 * @description
 * # citySearch
 * Service in the weatherApp.
 */

 
angular.module('weatherApp')
  .service('citySearch',['$http','usSpinnerService',function ($http,usSpinnerService) {
    var that = this;
    this.searchData = {};   
    this.searchCities = function(query){
         usSpinnerService.spin('city-search-spinner');
         $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q='+query+'&callback=JSON_CALLBACK&APPID=b8dd231935128177b587fcf565d4711f').
         success(function(data) {
           that.searchData.results = data;
           usSpinnerService.stop('city-search-spinner');
         }).
         error(function (data) {
           console.log(data);
         });
         
    };
    
    
    
  }]);
