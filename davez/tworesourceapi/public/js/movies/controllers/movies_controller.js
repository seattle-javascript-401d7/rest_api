var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MoviesController', ['$http', function($http) {
    this.Movies = [];
    var originalMovie = {};

    this.getAll = () => {
      $http.get(baseUrl + '/api/movies')
      .then((res) => {
        this.Movies = res.data;
      }, handleError.bind(this));
    };
    this.createMovie = () => {
      $http.post(baseUrl + '/api/movies', this.newMovie)
      .then((res) => {
        this.Movies.push(res.data);
        this.newMovie = null;
      }, handleError.bind(this));
    };
    this.updateMovie = (movie) => {
      $http.put(baseUrl + '/api/movies/' + movie.name, movie)
      .then(() => {
        movie.editing = false;
      }, handleError.bind(this));
    };
    this.editMovie = (movie) => {
      movie.editing = true;
      originalMovie.name = movie.name;
      originalMovie.genre = movie.genre;
      originalMovie.year = movie.year;
      originalMovie.rating = movie.rating;
      originalMovie.runTime = movie.runTime;
      originalMovie.emotion = movie.emotion;
    };
    this.removeMovie = (movie) => {
      $http.delete(baseUrl + '/api/movies/' + movie.name)
      .then(() => {
        this.Movies.splice(this.Movies.indexOf(movie), 1);
      }, handleError.bind(this));
    };
  }]);
}
