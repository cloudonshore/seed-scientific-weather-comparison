'use strict';

describe('Service: citySearch', function () {

  // load the service's module
  beforeEach(module('weatherApp'));

  // instantiate service
  var citySearch;
  beforeEach(inject(function (_citySearch_) {
    citySearch = _citySearch_;
  }));

  it('should do something', function () {
    expect(!!citySearch).toBe(true);
  });

});
