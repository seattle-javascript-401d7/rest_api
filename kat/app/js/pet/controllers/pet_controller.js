var url = require('../../config.js').url;
module.exports = function(app) {
  app.controller('PetController', ['$http', 'totalErrorHandle',
  function($http, totalErrorHandle) {
    this.pet = [];
    this.errors = [];

    this.getAll = function() {
      $http.get(url + '/api/pet')
      .then((res) => {
        this.pet = res.data;
      }, totalErrorHandle(this.errors, 'could not find pets'));
    }.bind(this);

    this.createPet = function() {
      $http.post(url + '/api/pet', this.newPet)
      .then((res) => {
        this.pet.push(res.data);
        this.newPet = null;
      }, totalErrorHandle(this.errors, 'could not adopt a new pet ' + this.newPet.name));
    }.bind(this);

    this.deletePet = function(pet) {
      $http.delete(url + '/api/pet/' + pet._id)
      .then(() => {
        this.pet.splice(this.pet.indexOf(pet), 1);
      }, totalErrorHandle(this.errors, 'could get rid of a pet ' + pet.name));
    }.bind(this);

    this.updatePet = function(pet) {
      $http.put(url + '/api/pet/' + pet._id, pet)
      .then(() => {
        pet.editing = false;
      }, totalErrorHandle(this.errors, 'could update a new pet ' + pet.name));
    }.bind(this);

  }]);
};
