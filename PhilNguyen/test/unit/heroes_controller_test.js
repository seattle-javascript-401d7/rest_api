var angular = require('angular');
require('angular-mocks');

describe('superheroes controller', function() {
  var $controller;

  beforeEach(angular.mock.module('newApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var heroesctrl = $controller('HeroesController');
    expect(typeof heroesctrl).toBe('object');
    expect(typeof heroesctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var heroesctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      heroesctrl = $controller('HeroesController');
    }));
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET request to retrieve superheroes', function() {
      $httpBackend.expectGET('http://localhost:8080/api/superheroes')
      .respond(200, [ { name: 'test_superhero' } ]);
      heroesctrl.getAll();
      $httpBackend.flush();
      expect(heroesctrl.superheroes.length).toBe(1);
      expect(heroesctrl.superheroes[0].name).toBe('test_superhero');
    });

    it('should create a superhero', function() {
      $httpBackend.expectPOST('http://localhost:8080/api/superheroes', { name: 'captain_america' })
      .respond(200, { name: 'some hero' });
      expect(heroesctrl.superheroes.length).toBe(0);
      heroesctrl.newSuperhero = { name: 'captain_america' };
      heroesctrl.createSuperhero();
      $httpBackend.flush();
      expect(heroesctrl.superheroes[0].name).toBe('some hero');
      expect(heroesctrl.newSuperhero).toBe(null);
    });

    it('should update a superhero', function() {
      $httpBackend.expectPUT('http://localhost:8080/api/superheroes/1',
      { name: 'updated hero!', powerlevel: 2000, editing: true, _id: 1 }).respond(200);
      heroesctrl.superheroes = [{ name: 'test hero', powerlevel: 2000, editing: true, _id: 1 }];
      heroesctrl.superheroes[0].name = 'updated hero!';
      heroesctrl.updateSuperhero(heroesctrl.superheroes[0]);
      $httpBackend.flush();
      expect(heroesctrl.superheroes[0].editing).toBe(false);
    });

    it('should remove a superhero', function() {
      $httpBackend.expectDELETE('http://localhost:8080/api/superheroes/1').respond(200);
      heroesctrl.superheroes = [{ name: 'test', powerlevel: 100, _id: 1 }];
      heroesctrl.removeSuperhero(heroesctrl.superheroes[0]);
      $httpBackend.flush();
      expect(heroesctrl.superheroes.length).toBe(0);
    });
  });
});
