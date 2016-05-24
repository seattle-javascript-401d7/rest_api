var handleErrors = require('../../lib').handleErrors;
var url = require('../../config').url;
module.exports = function(app) {
  app.controller('CheeseController', ['$http', function($http) {
    this.cheese = [];
    this.getAll = () => {
      $http.get(url + '/api/cheese')
      .then((res) => {
        this.cheese = res.data;
      }, handleErrors.bind(this));
    };
    this.createCheese = () => {
      $http.post(url + '/api/cheese', this.newCheese)
      .then((res) => {
        this.cheese.push(res.data);
        this.newCheese = null;
      }, handleErrors.bind(this));
    };
    this.deleteCheese = (cheese) => {
      $http.delete(url + '/api/cheese/' + cheese._id)
      .then(() => {
        this.cheese.splice(this.cheese.indexOf(cheese), 1);
      }, handleErrors.bind(this));
    };
    this.updateCheese = (cheese) => {
      $http.put(url + '/api/cheese/' + cheese._id, cheese)
      .then(() => {
        cheese.editing = false;
      }, handleErrors.bind(this));
    };
  }]);
};
