'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:cityList
 * @description
 * # cityList
 */
angular.module('weatherApp')
  .directive('cityList',['cities', function (cities) {
    return {
      templateUrl: 'views/city_list.html',
      restrict: 'E',
      link: function postLink(scope) {
         scope.cities = cities.cities;
         scope.$on('city-set',function(){
           scope.cities = cities.cities;
         });
         scope.$on('delete-city',function(event,args){
           cities.deleteCity(args.id);
         });
      }
    };
  }]);
