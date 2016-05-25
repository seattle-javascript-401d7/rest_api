var angular = require('angular');

describe('handleError service', function() {
  var handleError;
  beforeEach(angular.mock.module('newApp'));

  it('should return a function', angular.mock.inject(function(handleError) {
    expect(typeof handleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(handleError) {
    var testArray = [];
    handleError(testArray, 'test error message')();
    expect(testArray.length).toBe(1);
    expect(testArray[0] instanceof Error).toBe(true);
    expect(testArray[0].message).toBe('test error message');
  }));
});
