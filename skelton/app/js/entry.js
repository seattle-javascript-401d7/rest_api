const angular = require('angular');

const crudNG = angular.module('crudNG', []);
const baseUrl = 'http://localhost:3000';
const handleError = require('../../lib/error_handler');

crudNG.controller('ShoesController', ['$http', function($http) {
  this.shoes = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/shoes')
      .then((res) => {
        this.shoes = res.data;
      }, handleError.bind(this));
  };

  this.createShoe = () => {
    $http.post(baseUrl + '/api/shoes', this.newShoe)
      .then((res) => {
        this.shoes.push(res.data);
        this.newShoe = null;
      }, handleError.bind(this));
  };

  this.updateShoe = (shoe) => {
    $http.put(baseUrl + '/api/shoes/' + shoe._id, shoe)
      .then(() => {
        shoe.editing = false;
      }, handleError.bind(this));
  };

  this.removeShoe = (shoe) => {
    $http.delete(baseUrl + '/api/shoes/' + shoe._id)
      .then(() => {
        this.shoes.splice(this.shoes.indexOf(shoe), 1);
      }, handleError.bind(this));
  };
}]);

crudNG.controller('PantsController', ['$http', function($http) {
  this.pants = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/pants')
      .then((res) => {
        this.pants = res.data;
      }, handleError.bind(this));
  };

  this.createPant = () => {
    $http.post(baseUrl + '/api/pants', this.newPant)
      .then((res) => {
        this.pants.push(res.data);
        this.newPant = null;
      }, handleError.bind(this));
  };

  this.updatePant = (pant) => {
    $http.put(baseUrl + '/api/pants/' + pant._id, pant)
      .then(() => {
        pant.editing = false;
      }, handleError.bind(this));
  };

  this.removePant = (pant) => {
    $http.delete(baseUrl + '/api/pants/' + pant._id)
      .then(() => {
        this.pants.splice(this.pants.indexOf(pant), 1);
      }, handleError.bind(this));
  };
}]);
