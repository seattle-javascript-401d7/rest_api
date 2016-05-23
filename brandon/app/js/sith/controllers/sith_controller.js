var errorHandler = require('../../lib').errorHandler;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('SithController', ['$http', function($http) {
    this.siths = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/sith')
        .then((res) => {
          this.siths = res.data;
        }, errorHandler.bind(this));
    };

    this.createSith = function() {
      $http.post(baseUrl + '/api/sith', this.newSith)
        .then((res) => {
          this.siths.push(res.data);
          this.newSith = null;
        }, errorHandler.bind(this));
    }.bind(this);

    this.updateSith = function(sith) {
      $http.put(baseUrl + '/api/sith/' + sith._id, sith)
        .then(() => {
          sith.editing = false;
        }, errorHandler.bind(this));
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
