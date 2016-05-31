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
      expect(movieCntrl.Movies.length).toBe(1);
      expect(movieCntrl.Movies[0].name).toBe('movie');
    });
    it('should create a movie', function() {
      $httpBackend.expectPOST('http://localhost:7777/api/movies', {name: 'serpico'}).respond(200, {name: 'insomnia'});
      expect(movieCntrl.Movies.length).toBe(0);
      movieCntrl.newMovie = {name: 'serpico'};
      movieCntrl.createMovie();
      $httpBackend.flush();
      expect(movieCntrl.Movies[0].name).toBe('insomnia');
      expect(movieCntrl.newMovie).toBe(null);
    });
    it('should update a movie', function() {
      $httpBackend.expectPUT('http://localhost:7777/api/movies/1', {name: 'changemovie', editing: true, _id: 1}).respond(200);

      movieCntrl.Movies = [{name: 'updated', editing: true, _id: 1}];
      movieCntrl.Movies[0].name = 'changemovie';
      movieCntrl.updateMovie(movieCntrl.Movies[0]);
      $httpBackend.flush();
      expect(movieCntrl.Movies[0].editing).toBe(false);
      expect(movieCntrl.Movies[0].name).toBe('changemovie');
    });
    it('should delete a movie', function() {
      $httpBackend.expectDELETE('http://localhost:7777/api/movies/2').respond(200);
      movieCntrl.Movies = [{name: 'boogy', _id: 2}];
      movieCntrl.removeMovie(movieCntrl.Movies[0]);
      $httpBackend.flush();
      expect(movieCntrl.Movies[0].name).toBe('boogy');
      expect(movieCntrl.Movies.length).toBe(1);
    });
  });
});
