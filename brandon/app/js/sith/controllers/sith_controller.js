var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('SithController', ['$http', 'cfHandleError', function($http, cfHandleError) {
    this.siths = [];
    this.errors = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/sith')
        .then((res) => {
          this.siths = res.data;
        }, cfHandleError(this.errors, 'could not retrieve sith'));
    };

    this.createSith = function() {
      var sithName = this.newSith.name;
      $http.post(baseUrl + '/api/sith', this.newSith)
        .then((res) => {
          this.siths.push(res.data);
          this.newSith = null;
        }, cfHandleError(this.errors, 'could not create ' + sithName));
    }.bind(this);

    this.updateSith = function(sith) {
      $http.put(baseUrl + '/api/sith/' + sith._id, sith)
        .then(() => {
          sith.editing = false;
        }, cfHandleError(this.errors, 'could not update ' + sith.name));
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

    this.removeSith = function(sith) {
      $http.delete(baseUrl + '/api/sith/' + sith._id)
      .then(() => {
        this.siths.splice(this.siths.indexOf(sith), 1);
      }, errorHandler.bind(this));
    }.bind(this);
  }]);
};
