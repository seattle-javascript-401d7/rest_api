const angular = require('angular');

const moviesApp = angular.module('moviesApp', []);
const baseUrl = 'http://localhost:7777';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

moviesApp.controller('MoviesController', ['$http', function($http) {
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

moviesApp.controller('SongsController', ['$http', function($http) {
  this.Songs = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/songs')
    .then((res) => {
      this.Songs = res.data;
    }, handleError.bind(this));
  };
  this.createSong = () => {
    $http.post(baseUrl + '/api/songs', this.newSong)
    .then((res) => {
      this.Songs.push(res.data);
      this.newSong = null;
    }, handleError.bind(this));
  };
  this.updateSong = (song) => {
    $http.put(baseUrl + '/api/songs/' + song.name, song)
    .then(() => {
      song.editing = false;
    }, handleError.bind(this));
  };
  this.removeSong = (song) => {
    $http.delete(baseUrl + '/api/songs/' + song.name)
    .then(() => {
      this.Songs.splice(this.Songs.indexOf(song), 1);
    }, handleError.bind(this));
  };
}]);
