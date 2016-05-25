const angular = require('angular');
const newApp = angular.module('newApp', []);

require('./services')(newApp);
require('./superheroes')(newApp);
require('./villains')(newApp);
