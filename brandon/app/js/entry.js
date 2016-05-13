const angular = require('angular');

const liveApp = angular.module('liveApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

liveApp.controller('JediController', ['$http', function($http) {
  this.jedis = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/jedi', this.newJedi)
      .then((res) => {
        this.jedis = res.data;
      }, handleError.bind(this));
  };

  this.createJedi = () => {
    $http.post(baseUrl + '/api/jedi', this.newJedi)
      .then((res) => {
        this.jedis.push(res.data);
        this.newJedi = null;
      }, handleError.bind(this));
  };

  this.updateJedi = (jedis) => {
    $http.put(baseUrl + '/api/jedi/' + jedis._id, jedis)
      .then(() => {
        jedis.editing = false;
      }, handleError.bind(this));
  };

  this.removeJedi = (jedis) => {
    $http.delete(baseUrl + '/api/jedi/' + jedis._id)
      .then(() => {
        this.jedis.splice(this.jedis.indexOf(jedis), 1);
      }, handleError.bind(this));
  };
}]);
