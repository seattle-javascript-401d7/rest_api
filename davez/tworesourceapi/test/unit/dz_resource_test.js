var angular = require('angular');
require('angular-mocks');

describe('dzResource', function() {
  var dzResource;
  beforeEach(angular.mock.module('moviesApp'));

  it('should return a function', angular.mock.inject(function(dzResource) {
    expect(typeof dzResource).toBe('function');
  }));
  it('should add resource to the data array', angular.mock.inject(function(dzResource, $httpBackend) {
    $httpBackend.expectPOST('localhost:7777/api/movies', {name: 'test'}).respond(200, {name: 'another test', _id: 0});
    var baseUrl = 'localhost:7777/api/movies';
    var testArray = [];
    var errorTest = [];
    var message = {
      message: {create: 'test error create'}
    };
    var testRemote = new dzResource(testArray, errorTest, baseUrl, message);
    testRemote.create({name: 'test'});
    $httpBackend.flush();
    var baseUrl = 'localhost:8888';
    expect(typeof testRemote).toBe('object');
    expect(testArray.length).toBe(1);
    expect(errorTest.length).toBe(0);
    expect(testArray[0].name).toBe('another test');
    expect(testRemote.customErrors.message.create).toBe('test error create');
  }));
});
