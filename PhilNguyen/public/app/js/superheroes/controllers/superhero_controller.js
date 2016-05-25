var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroesController', ['$http', 'handleError', function($http, handleError) {
    this.superheroes = [];
    this.errors = [];
    this.getAll = function() {
      $http.get(baseUrl + '/api/superheroes')
      .then((res) => {
        this.superheroes = res.data;
      }, handleError(this.errors, 'could not retrieve superheroes'));
    }.bind(this);

    this.createSuperhero = function() {
      var superheroName = this.newSuperhero.name;
      $http.post(baseUrl + '/api/superheroes', this.newSuperhero)
      .then((res) => {
        this.superheroes.push(res.data);
        this.newSuperhero = null;
      }, handleError(this.errors, 'could not create a new superhero ' + superheroName));
    }.bind(this);

    this.updateSuperhero = function(superhero) {
      $http.put(baseUrl + '/api/superheroes/' + superhero._id, superhero)
      .then(() => {
        superhero.editing = false;
      }, handleError(this.errors, 'could not update superhero ' + superhero.name));
    }.bind(this);

    this.removeSuperhero = function(superhero) {
      $http.delete(baseUrl + '/api/superheroes/' + superhero._id)
      .then(() => {
        this.superheroes.splice(this.superheroes.indexOf(superhero), 1);
      }, handleError(this.errors, 'could not remove superhero ' + superhero.name));
    }.bind(this);
  }]);
};
