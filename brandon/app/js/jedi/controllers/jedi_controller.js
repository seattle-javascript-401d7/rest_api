var errorHandler = require('../../lib').errorHandler;
var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('JediController', ['$http', function($http) {
    this.jedis = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/jedi')
        .then((res) => {
          this.jedis = res.data;
        }, errorHandler.bind(this));
    };

    this.createJedi = function() {
      $http.post(baseUrl + '/api/jedi', this.newJedi)
        .then((res) => {
          this.jedis.push(res.data);
          this.newJedi = null;
        }, errorHandler.bind(this));
    }.bind(this);

    this.updateJedi = function(jedi) {
      $http.put(baseUrl + '/api/jedi/' + jedi._id, jedi)
        .then(() => {
          jedi.editing = false;
        }, errorHandler.bind(this));
    };

    this.editJedi = function(jedi) {
      jedi.editing = true;
      this.backup = copy(jedi);
    }.bind(this);

    this.cancelJedi = function(jedi) {
      jedi.editing = false;
      for (var key in this.backup) {
        jedi[key] = this.backup[key];
      }
    };

    this.removeJedi = function(jedi) {
      $http.delete(baseUrl + '/api/jedi/' + jedi._id)
      .then(() => {
        this.jedis.splice(this.jedis.indexOf(jedi), 1);
      }, errorHandler.bind(this));
    }.bind(this);
  }]);
};
