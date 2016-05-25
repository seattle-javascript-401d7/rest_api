var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainsController', ['$http', 'handleError', function($http, handleError) {
    this.villains = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/villains')
      .then((res) => {
        this.villains = res.data;
      }, handleError(this.errors, 'could not retrieve villains'));
    }.bind(this);

    this.createVillain = function() {
      var villainName = this.newVillain.name;
      $http.post(baseUrl + '/api/villains', this.newVillain)
      .then((res) => {
        this.villains.push(res.data);
        this.newVillain = null;
      }, handleError(this.errors, 'could not create a villain ' + villainName));
    }.bind(this);

    this.updateVillain = function(villain) {
      $http.put(baseUrl + '/api/villains/' + villain._id, villain)
      .then(() => {
        villain.editing = false;
      }, handleError(this.errors, 'could not update villain ' + villain.name));
    }.bind(this);

    this.removeVillain = function(villain) {
      $http.delete(baseUrl + '/api/villains/' + villain._id)
      .then(() => {
        this.villains.splice(this.villains.indexOf(villain), 1);
      }, handleError(this.errors, 'could not delete ' + villain.name));
    }.bind(this);
  }]);
};
