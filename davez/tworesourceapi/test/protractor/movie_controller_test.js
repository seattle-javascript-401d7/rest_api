var angular = require('angular');
require('angular-mocks');

describe('movies controller', function() {
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
      $httpBackend.verifyNoOutstandingRequests();
    });

    it('should use a GET to retrieve movies', function() {
      $httpBackend.expectGET('http://localhost:7777/api/movies').respond(200, [{name: 'test movie'}]);
      movieCntrl,getAll();
      $httpBackend.flush();
      expect(movieCntrl.movies.length).toBe(1);
      expect(movieCntrl.movies[0].name).toBe('test movie');
    });
    it('should create a movie', function() {
      $httpBackend.expectPOST('http://localhost:7777/api/movies', {name: 'movie'}).respond(200, {name: 'some movie'});
      expect(movieCntrl.movies.length).toBe(0);
      movieCntrl.newMovie = {name: 'movie'};
      movieCntrl.createMovie();
      $httpBackend.flush();
      expect(movieCntrl.movies[0].name).toBe('some movie');
      expect(movieCntrl.newMovie).toBe(null);
    });
    it('should upate a movie', function() {
        $httpBackend.expectPUT('http://localhost:7777/api/movies/1', {name: 'change movies!', editing: true, _id: 1}).respond(200);

        movieCntrl.movies = [{name: 'test movie', editing: true, _id: 1}];
        movieCntrl.movies[0].name = 'change movies!';
        movieCntrl.updateMovie(movieCntrl.movies[0]);
        $httpBackend.flush();
        expect(movieCntrl.movies[0].editing).toBe(false);
    });
    it('should delete a movie', function() {
      $httpBackend.expectDELETE('http://localhost:7777/api/movies/1').respond(200);
      movieCntrl.movies = [{name: 'movie', _id: 1}];
      movieCntrl.removeMovie(movieCntrl.movies[0]);
      $httpBackend.flush();
      expect(movieCntrl.movies.length).toBe(0);
    });
  });
});
