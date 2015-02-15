'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:humidity
 * @function
 * @description
 * # humidity
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('humidity', function () {
    return function (input) {
      return input + '%';
    };
  });
