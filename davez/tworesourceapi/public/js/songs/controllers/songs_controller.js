var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SongsController', ['dzResource', function(Resource) {
    this.Songs = [];
    this.errors = [];
    var message = {
      message: {
        getAll: 'cannot retreive songs',
        create: 'cannot add Song',
        update: 'cannot update song',
        remove: 'cannot delete song'
      }
    };
    var remote = new Resource(this.Songs, this.errors, baseUrl + '/api/songs', message);
    this.getAll = remote.getAll.bind(remote);
    this.createSong = function() {
      remote.create(this.newSong)
      .then(() => {
        this.newSong = null;
      });
    }.bind(this);
    this.updateSong = function(song) {
      remote.update(song)
      .then(() => {
        song.editing = false;
      });
    };
    this.editSong = (song) => {
      remote.edit(song);
    };
    this.cancelEdit = (song) => {
      remote.cancel(song);
    };
    this.removeSong = remote.remove.bind(remote);
  }]);
}
