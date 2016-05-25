const angular = require('angular');

describe('totalErrorHandle service', function() {
  var totalErrorHandle;
  beforeEach(angular.mock.module('practiceApp'));

  it('should return a function', angular.mock.inject(function(totalErrorHandle) {
    expect(typeof totalErrorHandle).toBe('function');
  }));

  it('should add an error to the array', angular.mock.inject(function(totalErrorHandle) {
    var fakeArray = [];
    totalErrorHandle(fakeArray, 'error')();
    expect(fakeArray.length).toBe(1);
    expect(fakeArray[0].message).toBe('error');
  }));
});
