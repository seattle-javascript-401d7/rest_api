const angular = require('angular');

describe('it should test the communication service', function() {
  beforeEach(angular.mock.module('newApp'));

  it('should return a function', angular.mock.inject(function(theStrongest) {
    expect(typeof theStrongest).toBe('object');
  }));

  it('should get the strongest hero', angular.mock.inject(function(theStrongest, $httpBackend) {
    $httpBackend.expectGET('http://localhost:8080/api/strongestHero')
    .respond(200, [ { name: 'Goku', powerlevel: 9000 } ]);

    var testData = theStrongest.superheroData = [];
    theStrongest.getStrongestHero();
    $httpBackend.flush();
    expect(testData.length).toBe(1);
    expect(testData[0].name).toBe('Goku');
  }));

  it('should get the strongest villain', angular.mock.inject(function(theStrongest, $httpBackend) {
    $httpBackend.expectGET('http://localhost:8080/api/strongestVillain')
    .respond(200, [ { name: 'Ultron', powerlevel: 10000 } ]);

    var testData = theStrongest.villainData = [];
    theStrongest.getStrongestVillain();
    $httpBackend.flush();
    expect(testData.length).toBe(1);
    expect(testData[0].name).toBe('Ultron');
  }));
});
