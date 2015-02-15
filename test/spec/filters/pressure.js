'use strict';

describe('Filter: pressure', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var pressure;
  beforeEach(inject(function ($filter) {
    pressure = $filter('pressure');
  }));

  it('should return the input prefixed with "pressure filter:"', function () {
    var text = 'angularjs';
    expect(pressure(text)).toBe('pressure filter: ' + text);
  });

});
