module.exports = function(app) {
  app.controller('AuthController', ['serviceAuth', 'handleError', '$location', function(serviceAuth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      serviceAuth.getUsername()
      .then((currentUser) => {
        this.username = currentUser;
      }, handleError(this.errors, 'could not retrieve username'));
    }.bind(this);

    this.logout = function() {
      serviceAuth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
