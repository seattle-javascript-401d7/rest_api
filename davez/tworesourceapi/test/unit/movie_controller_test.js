var angular = require('angular');
require('angular-mocks');

describe('movies controller', function() {
  // var $httpBackend;
  var $controller;

  beforeEach(angular.mock.module('moviesApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var movieCntrl = $controller('MoviesController');
    expect(typeof movieCntrl).toBe('object');
    expect(typeof movieCntrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var movieCntrl;

    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      movieCntrl = $controller('MoviesController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should send a GET to retrieve all movies', function() {
      $httpBackend.expectGET('http://localhost:7777/api/movies').respond(200, [{name: 'movie'}]);
      movieCntrl.getAll();
      $httpBackend.flush();
      expect(movieCntrl.movies.length).toBe(1);
      expect(movieCntrl.movies[0].name).toBe('movie');
    });
  });
});
