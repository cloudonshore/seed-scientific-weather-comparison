'use strict';

describe('Filter: humidity', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var humidity;
  beforeEach(inject(function ($filter) {
    humidity = $filter('humidity');
  }));

  it('should return the input prefixed with "humidity filter:"', function () {
    var text = 'angularjs';
    expect(humidity(text)).toBe('humidity filter: ' + text);
  });

});
