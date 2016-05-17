const angular = require('angular');

const practiceApp = angular.module('practiceApp', []);
const url = 'http://localhost:5555';

var handleErrors = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

practiceApp.controller('PetController', ['$http', function($http) {
  this.pet = [];
  this.getAll = () => {
    $http.get(url + '/api/pet')
    .then((res) => {
      this.pet = res.data;
    }, handleErrors.bind(this));
  };
  this.createPet = () => {
    $http.post(url + '/api/pet', this.newPet)
      .then((res) => {
        this.pet.push(res.data);
        this.newPet = null;
      }, handleErrors.bind(this));
  };
  this.deletePet = (pet) => {
    $http.delete(url + '/api/pet/' + pet._id)
      .then(() => {
        this.pet.splice(this.pet.indexOf(pet), 1);
      }, handleErrors.bind(this));
  };
  this.updatePet = (pet) => {
    $http.put(url + '/api/pet/' + pet._id, pet)
      .then(() => {
        pet.editing = false;
      }, handleErrors.bind(this));
  };
}]);


practiceApp.controller('SandwichController', ['$http', function($http) {
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
