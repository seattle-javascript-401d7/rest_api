const angular = require('angular');

const liveApp = angular.module('liveApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

const clone = function(obj) {
  var temp = obj.constructor();
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

liveApp.controller('SithController', ['$http', function($http) {
  this.siths = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/sith', this.newSith)
      .then((res) => {
        this.siths = res.data;
      }, handleError.bind(this));
  };

  this.createSith = () => {
    $http.post(baseUrl + '/api/sith', this.newSith)
      .then((res) => {
        this.siths.push(res.data);
        this.newSith = null;
      }, handleError.bind(this));
  };

  this.updateSith = (sith) => {
    $http.put(baseUrl + '/api/sith/' + sith._id, sith)
      .then(() => {
        sith.editing = false;
      }, handleError.bind(this));
  };

  this.editSith = (sith) => {
    sith.editing = true;
    this.backup = clone(sith);
  };

  this.cancelSith = (sith) => {
    sith.editing = false;
    for (var key in this.backup) {
      sith[key] = this.backup[key];
    }
  };

  this.removeSith = (sith) => {
    $http.delete(baseUrl + '/api/sith/' + sith._id)
    .then(() => {
      this.siths.splice(this.siths.indexOf(sith), 1);
    }, handleError.bind(this));
  };
}]);
