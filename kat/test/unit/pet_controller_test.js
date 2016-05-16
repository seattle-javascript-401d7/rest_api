var angular = require('angular');
require('angular-mocks');


describe('pet controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('practiceApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var petcontrol = $controller('PetController');
    expect(typeof petcontrol).toBe('object');
    expect(typeof petcontrol.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var petcontrol;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      petcontrol = $controller('PetController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve pet', function() {
      $httpBackend.expectGET('http://localhost:5555/api/pet').respond(200, [{ name: 'test pet' }]);
      petcontrol.getAll();
      $httpBackend.flush();
      expect(petcontrol.pet.length).toBe(1);
      expect(petcontrol.pet[0].name).toBe('test pet');
    });
  });

});
