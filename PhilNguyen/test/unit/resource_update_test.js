const angular = require('angular');

describe('crudResource', function() {
  var crudResource;

  beforeEach(angular.mock.module('newApp'));

  it('should return a function', angular.mock.inject(function(crudResource) {
    expect(typeof crudResource).toBe('function');
  }));

  it('should update a superhero', angular.mock.inject(function(crudResource, $httpBackend) {
    $httpBackend.expectPUT('http://localhost:8080/api/superheroes/1', { name: 'Gohan', powerlevel: 9000, _id: 1 }).respond(200);
    var testArray = [{ name: 'Gohan', powerlevel: 2333, _id: 1 }];
    var errorsArray = [];
    var baseUrl = 'http://localhost:8080/api/superheroes';
    var resource = new crudResource(testArray, errorsArray, baseUrl);

    testArray[0].powerlevel = 9000;
    resource.update(testArray[0]);
    $httpBackend.flush();
    expect(testArray[0].powerlevel).toBe(9000);
  }));
});
