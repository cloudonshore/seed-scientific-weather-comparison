'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')
  .controller('MainCtrl',['$scope','cities','errorHandler','$routeParams','$document', function ($scope,cities,errorHandler,$routeParams,$document) {
    if($routeParams.static)
    {
      cities.static = true;
      $scope.static = true;
    }
    else {
    	cities.static = false;
    	$scope.static = false;
    }
    cities.resetCityData();
    cities.initializeCityData();
    
    $scope.errors = errorHandler.errors;
    
    $scope.launchChardin = function(){
      angular.element($document[0].body).chardinStepJs('start');
    };
  }]);
