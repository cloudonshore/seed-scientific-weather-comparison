'use strict';

/**
 * @ngdoc filter
 * @name weatherApp.filter:temp
 * @function
 * @description
 * # temp
 * Filter in the weatherApp.
 */
angular.module('weatherApp')
  .filter('temp', function () {
    return function (input) {
      return (parseInt(input) - 256) + '°F';
    };
  });
