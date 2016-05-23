var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainsController', ['$http', function($http) {
    this.villains = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/villains')
      .then((res) => {
        this.villains = res.data;
      }, handleError.bind(this));
    };

    this.createVillain = () => {
      $http.post(baseUrl + '/api/villains', this.newVillain)
      .then((res) => {
        this.villains.push(res.data);
        this.newVillain = null;
      }, handleError.bind(this));
    };

    this.updateVillain = (villain) => {
      $http.put(baseUrl + '/api/villains/' + villain._id, villain)
      .then(() => {
        villain.editing = false;
      }, handleError.bind(this));
    };

    this.removeVillain = (villain) => {
      $http.delete(baseUrl + '/api/villains/' + villain._id)
      .then(() => {
        this.villains.splice(this.villains.indexOf(villain), 1);
      }, handleError.bind(this));
    };
  }]);
};
