var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('JediController', ['cfResource', 'theOldRepublic', function(Resource, theOldRepublic) {
    this.jedis = [];
    this.errors = [];
    var remote = new Resource(this.jedis, this.errors, baseUrl + '/api/jedi');
    this.getAll = remote.getAll.bind(remote);
    this.createJedi = function() {
      remote.create(this.newJedi)
        .then(() => {
          this.newJedi = null;
        });
    }.bind(this);
    this.updateJedi = function(jedi) {
      remote.update(jedi)
        .then(() => {
          jedi.editing = false;
        });
    };

    this.editJedi = function(jedi) {
      jedi.editing = true;
      this.backup = copy(jedi);
    }.bind(this);

    this.cancelJedi = function(jedi) {
      jedi.editing = false;
      for (var key in this.backup) {
        jedi[key] = this.backup[key];
      }
    };

    this.removeJedi = remote.remove.bind(remote);

    this.service = theOldRepublic;
    this.addJedi = theOldRepublic.addJedi.bind(theOldRepublic);
    theOldRepublic.jedis = this.jedis;
  }]);
};
