var baseUrl = require('../../config').baseUrl;
const copy = require('angular').copy;

module.exports = function(app) {
  app.controller('JediController', ['$http', 'cfHandleError', function($http, cfHandleError) {
    this.jedis = [];
    this.errors = [];
    this.getAll = () => {
      $http.get(baseUrl + '/api/jedi')
        .then((res) => {
          this.jedis = res.data;
        }, cfHandleError(this.errors, 'could not retrieve jedis'));
    };

    this.createJedi = function() {
      var jediName = this.newJedi.name;
      $http.post(baseUrl + '/api/jedi', this.newJedi)
        .then((res) => {
          this.jedis.push(res.data);
          this.newJedi = null;
        }, cfHandleError(this.errors, 'could not create ' + jediName));
    }.bind(this);

    this.updateJedi = function(jedi) {
      $http.put(baseUrl + '/api/jedi/' + jedi._id, jedi)
        .then(() => {
          jedi.editing = false;
        }, cfHandleError(this.errors, 'could not update ' + jedi.name));
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
      }, cfHandleError(this.errors, 'could not delete ' + jedi.name));
    }.bind(this);
  }]);
};
