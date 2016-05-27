var angular = require('angular');

describe('cfResource', () => {
  var cfResource;
  var $httpBackend;

  beforeEach(angular.mock.module('liveApp'));

  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a function', angular.mock.inject(function(cfResource) {
    expect(typeof cfResource).toBe('function');
  }));

  it('should add to the array', angular.mock.inject(function(cfResource) {
    $httpBackend.expectPOST('localhost:3000/api/jedi', { name: 'test jedi' }).respond(200, {
        name: 'completely different jedi', _id: 0 });
      var baseUrl = 'localhost:3000/api/jedi';
      var testArray = [];
      var errorTest = [];
      var testRemote = new cfResource(testArray, errorTest, baseUrl);
      testRemote.create({ name: 'test jedi' });
      $httpBackend.flush();
      expect(testArray.length).toBe(1);
      expect(errorTest.length).toBe(0);
      expect(testArray[0].name).toBe('completely different jedi');
  }));
});
