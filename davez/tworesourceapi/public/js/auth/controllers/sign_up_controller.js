var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location', 'dzHandleError', 'dzAuth', function($http, $location, handleError, auth) {
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User';
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
      .then((res) => {
        auth.saveToken(res.data.token);
        auth.getUsername();
        $location.path('/movies');
      }, handleError(this.errors, 'could not create user'));
    };
  }]);
};
