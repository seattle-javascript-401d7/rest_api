var angular = require('angular');

describe('cfResource', () => {
  var cfResource;

  beforeEach(angular.mock.module('liveApp'));

  it('should return a function', angular.mock.inject(function(cfResource) {
    expect(typeof cfResource).toBe('function');
  }));
});
