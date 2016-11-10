var angular = require('angular');
require('angular-mocks');


describe('cheese controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('practiceApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var cheesecontrol = $controller('CheeseController');
    expect(typeof cheesecontrol).toBe('object');
    expect(typeof cheesecontrol.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var cheesecontrol;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      cheesecontrol = $controller('CheeseController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve cheese', function() {
      $httpBackend.expectGET('http://localhost:5000/api/cheese').respond(200, [{ name: 'test cheese' }]);
      cheesecontrol.getAll();
      $httpBackend.flush();
      expect(cheesecontrol.cheese.length).toBe(1);
      expect(cheesecontrol.cheese[0].name).toBe('test cheese');
    });

    it('should create a cheese', function() {
      $httpBackend.expectPOST('http://localhost:5000/api/cheese', { name: 'Gruyere' })
      .respond(200, { name: 'Cheddar' });
      expect(cheesecontrol.cheese.length).toBe(0);
      cheesecontrol.newCheese = { name: 'Gruyere' };
      cheesecontrol.createCheese();
      $httpBackend.flush();
      expect(cheesecontrol.cheese[0].name).toBe('Cheddar');
      expect(cheesecontrol.newCheese).toBe(null);
    });

    it('should update a cheese', function() {
      $httpBackend.expectPUT('http://localhost:5000/api/cheese/1', { name: 'update cheese', editing: true, _id: 1 })
        .respond(200);
      cheesecontrol.cheese = [{ name: 'test cheese', editing: true, _id: 1 }];
      cheesecontrol.cheese[0].name = 'update cheese';
      cheesecontrol.updateCheese(cheesecontrol.cheese[0]);
      $httpBackend.flush();
      expect(cheesecontrol.cheese[0].editing).toBe(false);
    });

    it('should delete a cheese', function() {
      $httpBackend.expectDELETE('http://localhost:5000/api/cheese/1')
        .respond(200);
      cheesecontrol.cheese = [{ name: 'Gruyere', _id: 1 }];
      cheesecontrol.deleteCheese(cheesecontrol.cheese[0]);
      $httpBackend.flush();
      expect(cheesecontrol.cheese.length).toBe(0);
    });
  });
});
