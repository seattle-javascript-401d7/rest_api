var handleError = require('../../lib').handleError;
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('HeroesController', ['$http', function($http) {
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
  }]);
};
