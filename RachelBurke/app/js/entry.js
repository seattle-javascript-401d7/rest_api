const angular = require('angular');

const practiceApp = angular.module('practiceApp', []);
const url = 'http://localhost:5555';

var handleErrors = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

practiceApp.controller('WineController', ['$http', function($http) {
  this.wine = [];
  this.getAll = () => {
    $http.get(url + '/api/wine')
    .then((res) => {
      this.wine.push(res.data);
      this.newWine = null;
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
    $http.delete(url + '/api/wine' + wine._id)
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

practiceApp.controller('CheeseController', ['$http', function($http) {
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
