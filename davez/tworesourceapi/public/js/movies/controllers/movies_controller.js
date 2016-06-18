var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MoviesController', ['dzResource', function(Resource) {
    this.Movies = [];
    this.errors = [];
    var message = {
      message: {
        getAll: 'cannot retreive movies',
        create: 'cannot add Movie',
        update: 'cannot update Movie',
        remove: 'cannot delete Movie'
      }
    };
    var remote = new Resource(this.Movies, this.errors, baseUrl + '/api/movies', message);

    this.getAll = remote.getAll.bind(remote);
    this.createMovie = function() {
      remote.create(this.newMovie)
      .then(() => {
        this.newMovie = null;
      });
    }.bind(this);
    this.updateMovie = function(movie) {
      remote.update(movie)
      .then(() => {
        movie.editing = false;
      });
    };
    this.editMovie = (movie) => {
      remote.edit(movie);
    };
    this.cancelEdit = (movie) => {
      remote.cancel(movie);
    };
    this.removeMovie = remote.remove.bind(remote);
  }]);
};
