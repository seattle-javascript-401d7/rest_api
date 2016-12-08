const angular = require('angular');
const moviesApp = angular.module('moviesApp', []);

require('./services')(moviesApp);
require('./movies')(moviesApp);
require('./songs')(moviesApp);
