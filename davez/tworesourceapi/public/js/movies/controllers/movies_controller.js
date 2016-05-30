var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MoviesController', ['$http', 'dzHandleError', function($http, dzHandleError) {
    this.Movies = [];
    this.errors = [];
    var originalMovie = {};

    this.getAll = function() {
      $http.get(baseUrl + '/api/movies')
      .then((res) => {
        this.Movies = res.data;
      }, dzHandleError(this.errors, 'could not retrieve movies'));
    }.bind(this);

    this.createMovie = function() {
      $http.post(baseUrl + '/api/movies', this.newMovie)
      .then((res) => {
        this.Movies.push(res.data);
        this.newMovie = null;
      }, dzHandleError(this.errors, 'could not create movie'));
    }.bind(this);

    this.updateMovie = function(movie) {
      $http.put(baseUrl + '/api/movies/' + movie._id, movie)
      .then(() => {
        movie.editing = false;
      }, dzHandleError(this.errors, 'could not update movies'));
    }.bind(this);

    this.editMovie = (movie) => {
      movie.editing = true;
      originalMovie.name = movie.name;
      originalMovie.genre = movie.genre;
      originalMovie.year = movie.year;
      originalMovie.rating = movie.rating;
      originalMovie.runTime = movie.runTime;
      originalMovie.emotion = movie.emotion;
    };

    this.cancelEdit = (movie) => {
      movie.name = originalMovie.name;
      movie.genre = originalMovie.genre;
      movie.year = originalMovie.year;
      movie.rating = originalMovie.rating;
      movie.runTime = originalMovie.runTime;
      movie.emotion = originalMovie.emotion;
      movie.editing = false;
    };

    this.removeMovie = function(movie) {
      $http.delete(baseUrl + '/api/movies/' + movie.name)
      .then(() => {
        this.Movies.splice(this.Movies.indexOf(movie), 1);
      }, dzHandleError(this.errors, 'could not delete movie'));
    }.bind(this);
  }]);
}
