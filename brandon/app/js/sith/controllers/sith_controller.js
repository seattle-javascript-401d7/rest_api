var errorHandler = require('../../lib').error_handler;
var baseUrl = require('../../config').baseUrl;


module.exports = function() {
  const clone = function(obj) {
    var temp = obj.constructor();
    for (var key in obj) {
      temp[key] = obj[key];
    }
    return temp;
  };

  liveApp.controller('SithController', ['$http', function($http) {
    this.siths = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/sith', this.newSith)
        .then((res) => {
          this.siths = res.data;
        }, errorHandler.bind(this));
    };

    this.createSith = () => {
      $http.post(baseUrl + '/api/sith', this.newSith)
        .then((res) => {
          this.siths.push(res.data);
          this.newSith = null;
        }, errorHandler.bind(this));
    };

    this.updateSith = (sith) => {
      $http.put(baseUrl + '/api/sith/' + sith._id, sith)
        .then(() => {
          sith.editing = false;
        }, errorHandler.bind(this));
    };

    this.editSith = (sith) => {
      sith.editing = true;
      this.backup = clone(sith);
    };

    this.cancelSith = (sith) => {
      sith.editing = false;
      for (var key in this.backup) {
        sith[key] = this.backup[key];
      }
    };

    this.removeSith = (sith) => {
      $http.delete(baseUrl + '/api/sith/' + sith._id)
      .then(() => {
        this.siths.splice(this.siths.indexOf(sith), 1);
      }, errorHandler.bind(this));
    };
  }]);
};
