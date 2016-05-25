var url = require('../../config').url;
module.exports = function(app) {
  app.controller('SandwichController', ['$http', 'totalErrorHandle',
  function($http, totalErrorHandle) {
    this.sandwich = [];
    this.errors = [];

    this.getAll = function () {
      $http.get(url + '/api/sandwich')
      .then((res) => {
        this.sandwich = res.data;
      }, totalErrorHandle(this.errors, 'could not show sandwich options'));
    }.bind(this);
    this.createSandwich = function () {
      $http.post(url + '/api/sandwich', this.newSandwich)
      .then((res) => {
        this.sandwich.push(res.data);
        this.newSandwich = null;
      }, totalErrorHandle(this.errors, 'could not make ' + this.newSandwich.type));
    }.bind(this);
    this.deleteSandwich = function(sandwich) {
      $http.delete(url + '/api/sandwich/' + sandwich._id)
      .then(() => {
        this.sandwich.splice(this.sandwich.indexOf(sandwich), 1);
      }, totalErrorHandle(this.errors, 'could not eat ' + sandwich.type));
    }.bind(this);
    this.updateSandwich = function(sandwich) {
      $http.put(url + '/api/sandwich/' + sandwich._id, sandwich)
      .then(() => {
        sandwich.editing = false;
      }, totalErrorHandle(this.errors, 'could not improve ' + sandwich.type));
    }.bind(this);
  }]);
};
