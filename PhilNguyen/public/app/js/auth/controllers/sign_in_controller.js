var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'handleError', 'serviceAuth', function($http, $location, handleError, serviceAuth) {
    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
      .then((res) => {
        serviceAuth.saveToken(res.data.token);
        serviceAuth.getUsername();
        $location.path('/superheroes');
      }, handleError(this.errors, 'could not sign in with current user'));
    };
  }]);
};
