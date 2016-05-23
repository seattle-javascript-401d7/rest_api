var handleErrors = require('../../lib').handleErrors;
var url = require('../../config.js').url;
module.exports = function(app) {
  app.controller('WineController', ['$http', function($http) {
    this.wine = [];
    this.getAll = () => {
      $http.get(url + '/api/wine')
      .then((res) => {
        this.wine = res.data;
      }, handleErrors.bind(this));
    };
    this.createWine = () => {
      $http.post(url + '/api/wine', this.newWine)
      .then((res) => {
        this.wine.push(res.data);
        this.newWine = null;
      }, handleErrors.bind(this));
    };
    this.deleteWine = (wine) => {
      $http.delete(url + '/api/wine/' + wine._id)
      .then(() => {
        this.wine.splice(this.wine.indexOf(wine), 1);
      }, handleErrors.bind(this));
    };
    this.updateWine = (wine) => {
      $http.put(url + '/api/wine/' + wine._id, wine)
      .then(() => {
        wine.editing = false;
      }, handleErrors.bind(this));
    };
  }]);
};
