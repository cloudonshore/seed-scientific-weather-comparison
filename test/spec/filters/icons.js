'use strict';

describe('Filter: icons', function () {

  // load the filter's module
  beforeEach(module('weatherApp'));

  // initialize a new instance of the filter before each test
  var icons;
  beforeEach(inject(function ($filter) {
    icons = $filter('icons');
  }));

  it('should return the input prefixed with "icons filter:"', function () {
    var text = 'angularjs';
    expect(icons(text)).toBe('icons filter: ' + text);
  });

});
