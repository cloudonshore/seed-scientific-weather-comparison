'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('MainCtrl',['$scope','cities','errorHandler','$routeParams', function ($scope,cities,errorHandler,$routeParams) {
    if($routeParams.static)
    {
      cities.initializeCityDataStatic();
      $scope.static = true;
    }
    else {
    	cities.initializeCityData();
    }
    
    $scope.errors = errorHandler.errors;
  }]);
