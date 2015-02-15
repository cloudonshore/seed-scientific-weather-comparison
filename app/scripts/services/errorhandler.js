'use strict';

/**
 * @ngdoc service
 * @name weatherApp.errorHandler
 * @description
 * # errorHandler
 * Service in the weatherApp.
 */
angular.module('weatherApp')
  .service('errorHandler', function () {
    this.errors = {hasError:false,errorMessage:'There was a problem connecting to the OpenWeatherMap API'};
    this.displayError = function(){
      this.errors.hasError = true; 
      console.log('error!');
    };
  });
