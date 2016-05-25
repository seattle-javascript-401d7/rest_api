var angular = require('angular');
require('angular-mocks');

describe('cfHandleError service', () => {
  beforeEach(angular.mock.module('liveApp'));

  it('should return as a function', angular.mock.inject(function(cfHandleError) {
    expect(typeof cfHandleError).toBe('function');
  }));

  it('should add an error to the errors array', angular.mock.inject(function(cfHandleError) {
    var testArr = [];
    cfHandleError(testArr, 'this is a test message')();
    expect(testArr.length).toBe(1);
    expect(testArr[0] instanceof Error).toBe(true);
    expect(testArr[0].message).toBe('this is a test message');
  }));

});
