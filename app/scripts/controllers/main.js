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
      cities.static = true;
      $scope.static = true;
    }
    else {
    	cities.static = false;
    	$scope.static = false;
    }
    cities.initializeCityData();
    
    $scope.errors = errorHandler.errors;
  }]);
