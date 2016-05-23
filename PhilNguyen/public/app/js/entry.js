const angular = require('angular');
const newApp = angular.module('newApp', []);

require('./superheroes')(newApp);
require('./villains')(newApp);
