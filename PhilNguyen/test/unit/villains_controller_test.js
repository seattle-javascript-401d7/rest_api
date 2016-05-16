var angular = require('angular');
require('angular-mocks');

describe('villains controller', function() {
  var $controller;

  beforeEach(angular.mock.module('newApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var villainsctrl = $controller('VillainsController');
    expect(typeof villainsctrl).toBe('object');
    expect(typeof villainsctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var villainsctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      villainsctrl = $controller('VillainsController');
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET request to retrieve villains', function() {
      $httpBackend.expectGET('http://localhost:8080/api/villains')
      .respond(200, [{ name: 'test_villain' }]);
      villainsctrl.getAll();
      $httpBackend.flush();
      expect(villainsctrl.villains.length).toBe(1);
      expect(villainsctrl.villains[0].name).toBe('test_villain');
    });

    it('should create a villain', function() {
      $httpBackend.expectPOST('http://localhost:8080/api/villains', { name: 'Ultron' })
      .respond(200, { name: 'some cool villain' });
      expect(villainsctrl.villains.length).toBe(0);
      villainsctrl.newVillain = { name: 'Ultron' };
      villainsctrl.createVillain();
      $httpBackend.flush();
      expect(villainsctrl.villains[0].name).toBe('some cool villain');
      expect(villainsctrl.newVillain).toBe(null);
    });

    it('should update a villain', function() {
      $httpBackend.expectPUT('http://localhost:8080/api/villains/1',
      { name: 'updated villain', editing: true, _id: 1 }).respond(200);
      villainsctrl.villains = [{ name: 'test_villain', editing: true, _id: 1 }];
      villainsctrl.villains[0].name = 'updated villain';
      villainsctrl.updateVillain(villainsctrl.villains[0]);
      $httpBackend.flush();
      expect(villainsctrl.villains[0].name).toBe('updated villain');
      expect(villainsctrl.villains[0].editing).toBe(false);
    });

    it('should remove a villain', function() {
      $httpBackend.expectDELETE('http://localhost:8080/api/villains/1').respond(200);
      villainsctrl.villains = [{ name: 'test villain', powerlevel: 2, _id: 1 }];
      villainsctrl.removeVillain(villainsctrl.villains[0]);
      $httpBackend.flush();
      expect(villainsctrl.villains.length).toBe(0);
    });
  });
});
