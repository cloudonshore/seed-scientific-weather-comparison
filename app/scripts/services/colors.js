'use strict';

/**
 * @ngdoc service
 * @name weatherApp.colors
 * @description
 * # colors
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('colors', function () {
    this.colorList = {}; //used to store d3 colors generated in d3Bars for use in cityList
  });
