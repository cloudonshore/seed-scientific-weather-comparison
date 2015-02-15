'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:pressure
 * @function
 * @description
 * # pressure
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('pressure', function () {
    return function (input) {
      return input + ' hPa';
    };
  });
