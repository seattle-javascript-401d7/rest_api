const angular = require('angular');

describe('it should test the service', function() {
  var $httpBackend;
  beforeEach(angular.mock.module('newApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all the resources', angular.mock.inject(function(crudResource) {
    $httpBackend.expectGET('http://localhost:8080/api/superheroes').respond(200, [ { name: 'Goku' }]);

    var resourceArray = [];
    var errorsArray = [];
    var baseUrl = 'http://localhost:8080/api/superheroes';
    var resource = new crudResource(resourceArray, errorsArray, baseUrl);

    resource.getAll();
    $httpBackend.flush();
    expect(resourceArray.length).toBe(1);
    expect(resourceArray[0].name).toBe('Goku');
  }));
});
