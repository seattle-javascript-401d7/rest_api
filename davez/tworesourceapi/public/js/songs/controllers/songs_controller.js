var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['$http', function($http) {
    this.Songs = [];
    var originalSong = {};

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
      var upSong = [];
      console.log(upSong);
      song.update = song.name;
      console.log(song.update);
      var thisSong = song;
      console.log(thisSong);
      console.log('song id: ' + song._id);
      $http.put(baseUrl + '/api/songs/' + song.name, song)
      .then((res) => {
        upSong.push(res.data);
        console.log(res.config.data._id);
        song.editing = false;
      }, handleError.bind(this));
    };
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
    this.removeSong = (song) => {
      $http.delete(baseUrl + '/api/songs/' + song.name)
      .then(() => {
        this.Songs.splice(this.Songs.indexOf(song), 1);
      }, handleError.bind(this));
    };
  }]);
}
