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
  var tj = this;
  tj.jedis = [];
  tj.getAll = () => {
    $http.get(baseUrl + '/api/jedi')
      .then((res) => {
        tj.jedis = res.data;
      }, handleError.bind(tj));
  };

  tj.createJedi = () => {
    $http.post(baseUrl + '/api/jedi', tj.newJedi)
      .then((res) => {
        tj.jedis.push(res.data);
        tj.newJedi = null;
      }, handleError.bind(tj));
  };

  tj.removeJedi = (jedi) => {
    $http.delete(baseUrl + '/api/jedi/' + jedi._id)
    .then(() => {
      tj.jedis.splice(tj.jedis.indexOf(jedi), 1);
    }, handleError.bind(tj));
  };

  tj.updateJedi = (jedi) => {
    $http.put(baseUrl + '/api/jedi/' + jedi._id, jedi)
      .then(() => {
        jedi.editing = false;
      }, handleError.bind(tj));
  };


  tj.beginEdit = (jedi) => {
    jedi.editing = true;
    tj.backup = clone(jedi);
  };

  tj.endEdit = (jedi) => {
    jedi.editing = false;
    for (var key in tj.backup) {
      jedi[key] = tj.backup[key];
    }
  };
}]);
