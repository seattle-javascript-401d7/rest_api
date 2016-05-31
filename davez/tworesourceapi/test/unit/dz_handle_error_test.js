var angular = require('angular');
require('angular-mocks');

describe('dzHandleError helper service', function() {
  var dzHandleError;
  beforeEach(angular.mock.module('moviesApp'));

  it('should return a function', angular.mock.inject(function(dzHandleError) {
    expect(typeof dzHandleError).toBe('function');
  }));

  it('should add an error to the errors array',
  angular.mock.inject(function(dzHandleError) {
  var testError = [];
  dzHandleError(testError, 'this is a test error message')();
  expect(testError.length).toBe(1);
  expect(testError[0].message).toBe('this is a test error message');
  }));
});
