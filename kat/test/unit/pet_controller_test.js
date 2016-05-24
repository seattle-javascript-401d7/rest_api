var angular = require('angular');
require('angular-mocks');


describe('pet controller', function() { // eslint-disable-line prefer-arrow-callback
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('practiceApp'));

  beforeEach(angular.mock.inject(function(_$controller_) { // eslint-disable-line prefer-arrow-callback
    $controller = _$controller_;
  }));

  it('should be a controller', function() { // eslint-disable-line prefer-arrow-callback
    var petcontrol = $controller('PetController');
    expect(typeof petcontrol).toBe('object');
    expect(typeof petcontrol.getAll).toBe('function');
  });

  describe('REST functionality', function() { // eslint-disable-line prefer-arrow-callback
    var petcontrol;

    beforeEach(angular.mock.inject(function(_$httpBackend_) { // eslint-disable-line max-len
      $httpBackend = _$httpBackend_;
      petcontrol = $controller('PetController');
    }));

    afterEach(function() { // eslint-disable-line prefer-arrow-callback
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve pet', function() { // eslint-disable-line max-len prefer-arrow-callback
      $httpBackend.expectGET('http://localhost:5555/api/pet').respond(200, [{ name: 'test pet' }]);
      petcontrol.getAll();
      $httpBackend.flush();
      expect(petcontrol.pet.length).toBe(1);
      expect(petcontrol.pet[0].name).toBe('test pet');
    });

    it('should create a pet', function() { // eslint-disable-line prefer-arrow-callback
      $httpBackend.expectPOST('http://localhost:5555/api/pet', { name: 'Apollo' })
      .respond(200, { name: 'Moose' });
      expect(petcontrol.pet.length).toBe(0);
      petcontrol.newPet = { name: 'Apollo' };
      petcontrol.createPet();
      $httpBackend.flush();
      expect(petcontrol.pet[0].name).toBe('Moose');
      expect(petcontrol.newPet).toBe(null);
    });

    it('should update a pet', function() { // eslint-disable-line prefer-arrow-callback
      $httpBackend.expectPUT('http://localhost:5555/api/pet/1', { name: 'diff pet', editing: true, _id: 1 }) // eslint-disable-line max-len
      .respond(200);
      petcontrol.pet = [{ name: 'test pet', _id: 1, editing: true }];
      petcontrol.pet[0].name = 'diff pet';
      petcontrol.updatePet(petcontrol.pet[0]);
      $httpBackend.flush();
      expect(petcontrol.pet[0].editing).toBe(false);
    });

    it('should delete a pet', function() { // eslint-disable-line prefer-arrow-callback
      $httpBackend.expectDELETE('http://localhost:5555/api/pet/1')
      .respond(200);
      petcontrol.pet = [{ name: 'Apollo', _id: 1 }];
      petcontrol.deletePet(petcontrol.pet[0]);
      $httpBackend.flush();
      expect(petcontrol.pet.length).toBe(0);
    });
  });
});
