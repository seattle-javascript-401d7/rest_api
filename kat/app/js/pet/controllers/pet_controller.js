var handleErrors = require('../../lib').handleErrors;
var url = require('../../config.js').url;
module.exports = function(app) {
  app.controller('PetController', ['$http', function($http) {
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
};
