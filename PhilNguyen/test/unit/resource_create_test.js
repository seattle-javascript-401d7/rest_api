var angular = require('angular');

describe('crudResource', function() {
  var crudResource;

  beforeEach(angular.mock.module('newApp'));

  it('should return a function', angular.mock.inject(function(crudResource) {
    expect(typeof crudResource).toBe('function');
  }));

  it('should add to the test array', angular.mock.inject(function(crudResource, $httpBackend) {
    $httpBackend.expectPOST('http://localhost:8080/api/superheroes', { name: 'Vegeta', powerlevel: 2333 }).respond(200, { name: 'test character', powerlevel: 2, _id: 1 });
    var baseUrl = 'http://localhost:8080/api/superheroes';
    var testArray = [];
    var errorsArray = [];
    var resource = new crudResource(testArray, errorsArray, baseUrl);
    resource.create({ name: 'Vegeta', powerlevel: 2333 });
    $httpBackend.flush();
    expect(testArray.length).toBe(1);
    expect(errorsArray.length).toBe(0);
    expect(testArray[0].name).toBe('test character');
  }));
});
