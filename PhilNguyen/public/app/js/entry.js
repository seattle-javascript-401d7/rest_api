const angular = require('angular');

const newApp = angular.module('newApp', []);
const baseUrl = 'http://localhost:8080';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

newApp.controller('HeroesController', ['$http', function($http) {
  this.superheroes = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/superheroes')
    .then((res) => {
      this.superheroes = res.data;
    }, handleError.bind(this));
  };

  this.createSuperhero = () => {
    $http.post(baseUrl + '/api/superheroes', this.newSuperhero)
    .then((res) => {
      this.superheroes.push(res.data);
      this.newSuperhero = null;
    }, handleError.bind(this));
  };

  this.updateSuperhero = (superhero) => {
    $http.put(baseUrl + '/api/superheroes/' + superhero._id, superhero)
    .then(() => {
      superhero.editing = false;
    }, handleError.bind(this));
  };

  this.removeSuperhero = (superhero) => {
    $http.delete(baseUrl + '/api/superheroes/' + superhero._id)
    .then(() => {
      this.superheroes.splice(this.superheroes.indexOf(superhero), 1);
    }, handleError.bind(this));
  };
}])
.controller('VillainsController', ['$http', function($http) {
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
