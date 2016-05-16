const angular = require('angular');

const liveApp = angular.module('liveApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

const clone = function(obj) {
  var temp = obj.constructor;
  for (var key in obj) {
    temp[key] = obj[key];
  }
  return temp;
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

  this.updateJedi = (jedi) => {
    $http.put(baseUrl + '/api/jedi/' + jedi._id, jedi)
      .then(() => {
        jedi.editing = false;
      }, handleError.bind(this));
  };

  this.editJedi = (jedi) => {
    jedi.editing = true;
    this.backup = clone(jedi);
  };

  this.cancelJedi = (jedi) => {
    jedi.editing = false;
    for (var key in this.backup) {
      jedi[key] = this.backup[key];
    }
  };

  this.removeJedi = (jedi) => {
    $http.delete(baseUrl + '/api/jedi/' + jedi._id)
    .then(() => {
      this.jedis.splice(this.jedis.indexOf(jedi), 1);
    }, handleError.bind(this));
  };
}]);
