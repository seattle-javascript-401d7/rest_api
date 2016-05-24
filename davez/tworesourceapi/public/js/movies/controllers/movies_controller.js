var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MoviesController', ['$http', function($http) {
    this.Movies = [];
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
    this.removeMovie = (movie) => {
      $http.delete(baseUrl + '/api/movies/' + movie.name)
      .then(() => {
        this.Movies.splice(this.Movies.indexOf(movie), 1);
      }, handleError.bind(this));
    };
  }]);
}
