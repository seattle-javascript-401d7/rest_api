const angular = require('angular');

describe('deleting a superhero', function() {
  var crudResource;

  beforeEach(angular.mock.module('newApp'));

  it('should return a function', angular.mock.inject(function(crudResource) {
    expect(typeof crudResource).toBe('function');
  }));

  it('should remove a superhero', angular.mock.inject(function(crudResource, $httpBackend) {
    $httpBackend.expectDELETE('http://localhost:8080/api/superheroes/1').respond(200);
    var testArray = [{ name: 'Bardock', powerlevel: 9000, _id: 1 }];
    var errorsArray = [];
    var baseUrl = 'http://localhost:8080/api/superheroes';
    var resource = new crudResource(testArray, errorsArray, baseUrl);

    resource.remove(testArray[0]);
    $httpBackend.flush();
    expect(testArray.length).toBe(0);
  }));
});
