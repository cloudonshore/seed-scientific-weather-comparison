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
      templateUrl: '../views/city_list.html',
      restrict: 'E',
      link: function postLink(scope) {
         scope.$on('city-set',function(){
           scope.cities = cities.cities;
         });
      }
    };
  }]);
