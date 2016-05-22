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

    it('should create a pet', function() {
      $httpBackend.expectPOST('http://localhost:5555/api/pet', { name: 'Apollo' })
      .respond(200, { name: 'Moose' });
      expect(petcontrol.pet.length).toBe(0);
      petcontrol.newPet = { name: 'Apollo' };
      petcontrol.createPet();
      $httpBackend.flush();
      expect(petcontrol.pet[0].name).toBe('Moose');
      expect(petcontrol.newPet).toBe(null);
    });

    it('should update a pet', function() {
      $httpBackend.expectPUT('http://localhost:5555/api/pet/1', { name: 'diff pet', editing: true, _id: 1 })
      .respond(200);
      petcontrol.pet= [{ name: 'test pet', _id: 1, editing: true }];
      petcontrol.pet[0].name = 'diff pet';
      petcontrol.updatePet(petcontrol.pet[0]);
      $httpBackend.flush();
      expect(petcontrol.pet[0].editing).toBe(false);
    });

    it('should delete a pet', function() {
      $httpBackend.expectDELETE('http://localhost:5555/api/pet/1')
      .respond(200);
      petcontrol.pet = [{ name: 'Apollo', _id: 1 }];
      petcontrol.deletePet(petcontrol.pet[0]);
      $httpBackend.flush();
      expect(petcontrol.pet.length).toBe(0);
    });
  });
});
