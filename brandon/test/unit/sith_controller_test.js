var angular = require('angular');
require('angular-mocks');

describe('sith controller', () => {
  var $controller;

  beforeEach(angular.mock.module('liveApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var sithCtrl = $controller('SithController');
    expect(typeof sithCtrl).toBe('object');
    expect(typeof sithCtrl.getAll).toBe('function');
  });

  describe('REST functionality', () => {
    var $httpBackend;
    var sithCtrl;

    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      sithCtrl = $controller('SithController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should GET the Sith', () => {
      $httpBackend.expectGET('http://localhost:3000/api/sith').respond(200,
        [{ name: 'test sith' }]);
      sithCtrl.getAll();
      $httpBackend.flush();
      expect(sithCtrl.siths.length).toBe(1);
      expect(sithCtrl.siths[0].name).toBe('test sith');
    });

    it('should create a new Sith', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/sith', { name: 'newest sith'
        }).respond(200, { name: 'definitely a sith' });
      expect(sithCtrl.siths.length).toBe(0);
      sithCtrl.newSith = { name: 'newest sith' };
      sithCtrl.createSith();
      $httpBackend.flush();
      expect(sithCtrl.siths[0].name).toBe('definitely a sith');
      expect(sithCtrl.newSith).toBe(null);
    });

    it('should update a Sith', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/sith/1', { name: 'updated Sith',
      editing: true, _id: 1 } ).respond(200);
      sithCtrl.siths = [{ name: 'kylo penpal', editing: true, _id: 1 }];
      sithCtrl.siths[0].name = 'updated Sith';
      sithCtrl.updateSith(sithCtrl.siths[0]);
      $httpBackend.flush();
      expect(sithCtrl.siths[0].editing).toBe(false);
    });
  });
});
