var handleErrors = require('../../lib').handleErrors;
var url = require('../../config.js').url;
module.exports = function(app) {

  app.controller('SandwichController', ['$http', function($http) {
    this.sandwich = [];
    this.getAll = () => {
      $http.get(url + '/api/sandwich')
      .then((res) => {
        this.sandwich = res.data;
      }, handleErrors.bind(this));
    };
    this.createSandwich = () => {
      $http.post(url + '/api/sandwich', this.newSandwich)
      .then((res) => {
        this.sandwich.push(res.data);
        this.newSandwich = null;
      }, handleErrors.bind(this));
    };
    this.deleteSandwich = (sandwich) => {
      $http.delete(url + '/api/sandwich/' + sandwich._id)
      .then(() => {
        this.sandwich.splice(this.sandwich.indexOf(sandwich), 1);
      }, handleErrors.bind(this));
    };
    this.updateSandwich = (sandwich) => {
      $http.put(url + '/api/sandwich/' + sandwich._id, sandwich)
      .then(() => {
        sandwich.editing = false;
      }, handleErrors.bind(this));
    };
  }]);

};
