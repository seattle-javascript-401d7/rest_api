var handleErrors = require('../../lib').handleErrors;
var url = require('../../config').url;
module.exports = function(app) {
  app.controller('CheeseController', ['$http', function($http) {
    this.cheeses = [];
    this.newCheese = {};
    this.getAll = function() {
      $http.get(url + '/api/cheese')
      .then((res) => {
        this.cheeses = res.data;
      }, handleErrors.bind(this));
    }.bind(this);

    this.createCheese = function() {
      $http.post(url + '/api/cheese', this.newCheese)
      .then((res) => {
        this.cheeses.push(res.data);
        this.newCheese = null;
      }, handleErrors.bind(this));
    }.bind(this);

    this.deleteCheese = function(cheese) {
      $http.delete(url + '/api/cheese/' + cheese._id)
      .then(() => {
        this.cheeses.splice(this.cheeses.indexOf(cheese), 1);
      }, handleErrors.bind(this));
    }.bind(this);

    this.updateCheese = function(cheese) {
      $http.put(url + '/api/cheese/' + cheese._id, cheese)
      .then(() => {
        cheese.editing = false;
      }, handleErrors.bind(this));
    }.bind(this);
  }]);
};
