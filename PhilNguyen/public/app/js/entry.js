const angular = require('angular');
const newApp = angular.module('newApp', [require('angular-route')]);

require('./services')(newApp);
require('./superheroes')(newApp);
require('./villains')(newApp);
require('./auth')(newApp);

newApp.config(['$routeProvider', function($rp) {
  $rp
  .when('/superheroes', {
    templateUrl: 'templates/superheroes/views/superheroes_view.html',
    controller: 'HeroesController',
    controllerAs: 'heroesctrl'
  })
  .when('/villains', {
    templateUrl: 'templates/villains/views/villains_view.html',
    controller: 'VillainsController',
    controllerAs: 'villainsctrl'
  })
  .when('/signin', {
    templateUrl: 'templates/auth/views/auth_view.html',
    controller: 'SignInController',
    controllerAs: 'authctrl'
  })
  .when('/signup', {
    templateUrl: 'templates/auth/views/auth_view.html',
    controller: 'SignUpController',
    controllerAs: 'authctrl'
  })
  .otherwise({
    redirectTo: '/signup'
  });
}]);
