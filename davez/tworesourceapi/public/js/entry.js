const angular = require('angular');
const moviesApp = angular.module('moviesApp', [require('angular-route')]);

require('./services')(moviesApp);
require('./movies')(moviesApp);
require('./songs')(moviesApp);
require('./auth')(moviesApp);

moviesApp.config(['$routeProvider', function($rp) {
  $rp
  .when('/movies', {
    templateUrl: 'templates/both_view.html'
    // controller: 'MoviesController',
    // controllerAs: 'mvctrl'
  })
  .when('/signup', {
    templateUrl: 'templates/auth/views/auth_view.html',
    controller: 'SignUpController',
    controllerAs: 'authctrl'
  })
  .when('/signin', {
    templateUrl: 'templates/auth/views/auth_view.html',
    controller: 'SignInController',
    controllerAs: 'authctrl'
  })
  .otherwise({
    redirectTo: 'signup'
  });
}]);
