var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location', 'handleError', 'serviceAuth', function($http, $location, handleError, serviceAuth) {
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create new User!';
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
      .then((res) => {
        serviceAuth.saveToken(res.data.token);
        serviceAuth.getUsername();
        $location.path('/superheroes');
      }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};
