var angular = require('angular');
require('angular-mocks');


describe('sandwich controller', function() {
  var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('practiceApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var sandwichcontrol = $controller('SandwichController');
    expect(typeof sandwichcontrol).toBe('object');
    expect(typeof sandwichcontrol.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var sandwichcontrol;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      sandwichcontrol = $controller('SandwichController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve sandwich', function() {
      $httpBackend.expectGET('http://localhost:5555/api/sandwich').respond(200, [{ name: 'test sandwich' }]);
      sandwichcontrol.getAll();
      $httpBackend.flush();
      expect(sandwichcontrol.sandwich.length).toBe(1);
      expect(sandwichcontrol.sandwich[0].name).toBe('test sandwich');
    });

    it('should create a sandwich', function() {
      $httpBackend.expectPOST('http://localhost:5555/api/sandwich', { name: 'Tuna Melt' })
      .respond(200, { name: 'PB and J' });
      expect(sandwichcontrol.sandwich.length).toBe(0);
      sandwichcontrol.newSandwich = { name: 'Tuna Melt' };
      sandwichcontrol.createSandwich();
      $httpBackend.flush();
      expect(sandwichcontrol.sandwich[0].name).toBe('PB and J');
      expect(sandwichcontrol.newSandwich).toBe(null);
    });

    it('should update a sandwich', function() {
      $httpBackend.expectPUT('http://localhost:5555/api/sandwich/1', { name: 'update sandwich', editing: true, _id: 1 })
        .respond(200);
      sandwichcontrol.sandwich = [{ name: 'test sandwich', editing: true, _id: 1 }];
      sandwichcontrol.sandwich[0].name = 'update sandwich';
      sandwichcontrol.updateSandwich(sandwichcontrol.sandwich[0]);
      $httpBackend.flush();
      expect(sandwichcontrol.sandwich[0].editing).toBe(false);
    });

    it('should delete a sandwich', function() {
      $httpBackend.expectDELETE('http://localhost:5555/api/sandwich/1')
        .respond(200);
      sandwichcontrol.sandwich = [{ name: 'Tuna Melt', _id: 1 }];
      sandwichcontrol.deleteSandwich(sandwichcontrol.sandwich[0]);
      $httpBackend.flush();
      expect(sandwichcontrol.sandwich.length).toBe(0);
    });
  });
});
