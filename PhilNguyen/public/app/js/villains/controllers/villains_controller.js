var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('VillainsController', ['crudResource', 'theStrongest', function(Resource, theStrongest) {
    this.villains = [];
    this.errors = [];
    var crud = new Resource(this.villains, this.errors, baseUrl + '/api/villains', { errMessage: { getAll: 'custom error message ' } });
    this.getAll = crud.getAll.bind(crud);
    this.createVillain = function() {
      crud.create(this.newVillain)
      .then(() => {
        this.newVillain = null;
        theStrongest.getStrongestVillain();
      });
    }.bind(this);
    this.updateVillain = function(villain) {
      crud.update(villain)
      .then(() => {
        villain.editing = false;
      });
    };
    this.removeVillain = crud.remove.bind(crud);
  }]);
  app.controller('strongestVillain', ['theStrongest', function(theStrongest) {
    this.villains = theStrongest.villainData;
    this.getStrongestVillain = theStrongest.getStrongestVillain.bind(theStrongest);
  }]);
};
