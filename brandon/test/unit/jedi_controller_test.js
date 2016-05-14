var angular = require('angular');
require('angular-mocks');

describe('jedi controller', () => {
  var $controller;

  beforeEach(angular.mock.module('liveApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should be a controller', () => {
    var jediCtrl = $controller('JediController');
    expect(typeof jediCtrl).toBe('object');
    expect(typeof jediCtrl.getAll).toBe('function');
  });

  describe('REST functionality', () => {
    var $httpBackend;
    var jediCtrl;

    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      jediCtrl = $controller('JediController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to get a jedi', () => {
      $httpBackend.expectGET('http://localhost:3000/api/jedi').respond(200,
        [{ name: 'test jedi' }]);
      jediCtrl.getAll();
      $httpBackend.flush();
      expect(jediCtrl.jedis.length).toBe(1);
      expect(jediCtrl.jedis[0].name).toBe('test jedi');
    });

    it('should create a new Jedi', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/jedi', { name: 'Totally not a sith'
    }).respond(200, { name: 'a different person' });
      expect(jediCtrl.jedis.length).toBe(0);
      jediCtrl.newJedi = { name: 'Totally not a sith' };
      jediCtrl.createJedi();
      $httpBackend.flush();
      expect(jediCtrl.jedis[0].name).toBe('a different person');
      expect(jediCtrl.newJedi).toBe(null);
    });

    it('should update a Jedi', () => {
      $httpBackend.expectPUT('http://localhost:3000/api/jedi/1', { name: 'updated Jedi',
      editing: true, _id: 1 } ).respond(200);
      jediCtrl.jedis = [{ name: 'JEDI ALL CAPS', editing: true, _id: 1 }];
      jediCtrl.jedis[0].name = 'updated Jedi';
      jediCtrl.updateJedi(jediCtrl.jedis[0]);
      $httpBackend.flush();
      expect(jediCtrl.jedis[0].editing).toBe(false);
    });

    it('should delete a Jedi', () => {
      $httpBackend.expectDELETE('http://localhost:3000/api/jedi/1').respond(200);
      jediCtrl.jedis = [{ name: 'Anakin is no longer a jedi', _id: 1 }];
      jediCtrl.removeJedi(jediCtrl.jedis[0]);
      $httpBackend.flush();
      expect(jediCtrl.jedis.length).toBe(0);
    });
  });
});
