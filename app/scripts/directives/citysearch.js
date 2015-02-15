'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:citySearch
 * @description
 * # citySearch
 */
angular.module('weatherApp')
  .directive('citySearch',['citySearch', '$timeout','cities',function (citySearch,$timeout,cities) {
    return {
      templateUrl: '../views/city_search.html',
      restrict: 'E',
      link: function postLink(scope) {
        scope.searchData = citySearch.searchData;
        var tempFilterText = '',
               filterTextTimeout;
        scope.$watch('query',function(val){ //watch query for change
          if(val) //no null values
          {
	          if (filterTextTimeout) { $timeout.cancel(filterTextTimeout); } //cancel old requests, used to prevent lots of new searches when entering a query
	          tempFilterText = val;
	          filterTextTimeout = $timeout(function(){
	             citySearch.searchCities(val);
	             },500);
          }
          else {
          	scope.searchData.results = '';
          }
        });
        scope.validSearch = true;
        scope.$watch('searchData.results',function(val){ //watch query for change
         if(val)
         { 
          if(val.cod==='404' || !val.name || !val.sys.country)
          {
            scope.addText = 'City not found';
            scope.validSearch = false;
          }
          else {
          	scope.addText = val.name + ', ' + val.sys.country ;
          	scope.validSearch = true;
          }
         }
        });
        scope.addCity = function(cityId){
          cities.cities.unshift({'id':cityId}); //add new city to the list
          cities.initializeCityData(); //reinitialize to pull in new data
          scope.query='';
          scope.searchData.results = '';
        };
      }
    };
  }]);


