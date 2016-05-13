const angular = require('angular');

const liveApp = angular.module('liveApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(err) {
  console.log(err);
  this.errors = (this.errors || []).push(err);
};

liveApp.controller('JedisController', ['$http', function($http) {
  this.jedis = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/jedi')
      .then((res) => {
        this.jedi = res.data;
      }, handleError.bind(this));
  };
}]);
