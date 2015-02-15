'use strict';

describe('Filter: temp', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var temp;
  beforeEach(inject(function ($filter) {
    temp = $filter('temp');
  }));

  it('should return the input prefixed with "temp filter:"', function () {
    var text = 'angularjs';
    expect(temp(text)).toBe('temp filter: ' + text);
  });

});
