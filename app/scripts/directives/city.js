'use strict';

/**
 * @ngdoc directive
 * @name weatherApp.directive:city
 * @description
 * # city
 */
angular.module('weatherApp')
  .directive('city',['colors','$rootScope', function (colors,$rootScope) {
    return {
      templateUrl: 'views/city.html',
      restrict: 'E',
      scope: {data:'='},
      link: function postLink(scope) {
        scope.color = colors.colorList[scope.data.id];
        scope.$on('color-set',function(){
          scope.color = colors.colorList[scope.data.id];
        });
        scope.focusCity = function(){
          $rootScope.$broadcast('globe-focus-city',scope.data.cityData);
        };
        scope.deleteCity = function(){
        scope.$emit('delete-city',{id:scope.data.id});
        };
      }
    };
  }]);
