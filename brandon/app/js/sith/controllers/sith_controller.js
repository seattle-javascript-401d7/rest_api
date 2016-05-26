var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('SithController', ['cfResource', function(Resource) {
    this.siths = [];
    this.errors = [];
    var remote = new Resource(this.siths, this.errors, baseUrl + '/api/sith');
    this.getAll = remote.getAll.bind(remote);
    this.createSith = function() {
      remote.create(this.newSith)
        .then(() => {
          this.newSith = null;
        });
    }.bind(this);
    this.updateSith = function(sith) {
      remote.update(sith)
        .then(() => {
          sith.editing = false;
        });
    };

    this.editSith = function(sith) {
      sith.editing = true;
      this.backup = copy(sith);
    }.bind(this);

    this.cancelSith = function(sith) {
      sith.editing = false;
      for (var key in this.backup) {
        sith[key] = this.backup[key];
      }
    };

    this.removeSith = remote.remove.bind(remote);
  }]);
};
