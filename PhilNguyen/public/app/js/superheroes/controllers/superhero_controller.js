var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroesController',  ['crudResource', 'theStrongest', function(Resource, theStrongest) {
    this.superheroes = [];
    this.errors = [];
    var crud = new Resource(this.superheroes, this.errors, baseUrl + '/api/superheroes', { errMessages: { getAll: 'custom error message' } });
    this.getAll = crud.getAll.bind(crud);
    this.createSuperhero = function() {
      crud.create(this.newSuperhero)
      .then(() => {
        this.newSuperhero = null;
        theStrongest.getStrongestHero();
      });
    }.bind(this);
    this.updateSuperhero = function(superhero) {
      crud.update(superhero)
      .then(() => {
        superhero.editing = false;
      });
    };
    this.removeSuperhero = crud.remove.bind(crud);
    this.getAll();
  }])
  .controller('strongestHero', ['theStrongest', function(theStrongest) {
    this.heroes = theStrongest.superheroData;
    this.getStrongestHero = theStrongest.getStrongestHero.bind(theStrongest);
  }]);
};
