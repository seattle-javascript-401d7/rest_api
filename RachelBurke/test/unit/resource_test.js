var angular = require('angular');
require('angular-mocks');

describe('resource service', function() {
  var $httpBackend;
  var resource;

  beforeEach(angular.mock.module('racticeApp'));
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));
  it('should return a function', angular.mock.inject(function(resource) {
    expect(typeof resource).toBe('function');
  }));

  it('should getAll of the resources', angular.mock.inject(function(resource) {
    $httpBackend.expectGET('http://localhost:8000/api/wine').respond(200, [{ name: 'Test' }]);
    var testArray = [];
    var errorTest = [];
    var testUrl = 'http://localhost:8000/api/wine';
    var testRemote = new resource(testArray, errorTest, testUrl);
    testRemote.getAll();
    $httpBackend.flush();
    expect(testArray.length).toBe(1);
    expect(testArray[0].name).toBe(test);
  }));

  it('should delete an item from the test array', angular.mock.inject(function(resource, $h) {
    var baseUrl = 'http://localhost:8000/api/wine';
    var testItem = { name: 'test resource', _id: 1 };
    var testArray = [testItem];
    var errorTest = [];
    var testRemote = new resource(testArray, errorTest, baseUrl);
    $httpBackend.expectPut('http://localhost:8000/api/wine/1', testItem).respond(200);
    var result = testRemote.update(testItem);
    $httpBackend.flush();

    expect(testArray.length).toBe(1);
    expect(result instanceof $h).toBe(true);
  }));
});
