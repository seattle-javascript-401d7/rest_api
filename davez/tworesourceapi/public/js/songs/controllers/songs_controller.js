var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['$http', 'dzHandleError', function($http, dzHandleError) {
    this.Songs = [];
    this.errors = [];
    var originalSong = {};

    this.getAll = function() {
      $http.get(baseUrl + '/api/songs')
      .then((res) => {
        this.Songs = res.data;
      }, dzHandleError(this.errors, 'could not retrieve songs'));
    }.bind(this);

    this.createSong = function() {
      $http.post(baseUrl + '/api/songs', this.newSong)
      .then((res) => {
        this.Songs.push(res.data);
        this.newSong = null;
      }, dzHandleError(this.errors, 'could not create song'));
    }.bind(this);

    this.updateSong = function(song) {
      $http.put(baseUrl + '/api/songs/' + song._id, song)
      .then(() => {
        song.editing = false;
      }, dzHandleError(this.errors, 'could not update song'));
    }.bind(this);

    this.editSong = (song) => {
      song.editing = true;
      originalSong.name = song.name;
      originalSong.artist = song.artist;
      originalSong.album = song.album;
      originalSong.year = song.year;
      originalSong.genre = song.genre;
      originalSong.personalRating = song.personalRating;
      originalSong.emotion = song.emotion;
    };

    this.cancelEdit = (song) => {
      song.name = originalSong.name;
      song.artist = originalSong.artist;
      song.album = originalSong.album;
      song.year = originalSong.year;
      song.genre = originalSong.genre;
      song.personalRating = originalSong.personalRating;
      song.emotion = originalSong.emotion;
      song.editing = false;
    };

    this.removeSong = function(song) {
      $http.delete(baseUrl + '/api/songs/' + song.name)
      .then(() => {
        this.Songs.splice(this.Songs.indexOf(song), 1);
      }, dzHandleError(this.errors, 'could not delete song'));
    }.bind(this);
  }]);
}
