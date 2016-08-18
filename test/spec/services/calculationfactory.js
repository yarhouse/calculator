'use strict';

describe('Service: calculationFactory', function () {

  // load the service's module
  beforeEach(module('calculatorApp'));

  // instantiate service
  var calculationFactory;
  beforeEach(inject(function (_calculationFactory_) {
    calculationFactory = _calculationFactory_;
  }));

  it('should do something', function () {
    expect(!!calculationFactory).toBe(true);
  });

});
