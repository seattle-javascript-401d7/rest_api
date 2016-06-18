var angular = require('angular');

require('angular-mocks');

describe('dzCommunicate communication service', function() {
  beforeEach(angular.mock.module('moviesApp'));

  var $httpBackend;

  beforeEach(angular.mock.inject(function(_$httpBackend_, dzCommunicate) {
    $httpBackend = _$httpBackend_;
  }));

  it('should return a function', angular.mock.inject(function(dzCommunicate) {
    expect(typeof dzCommunicate).toBe('function');
  }));
});
