const angular = require('angular');

const liveApp = angular.module('liveApp', []);

require('./services')(liveApp);
require('./jedi')(liveApp);
require('./sith')(liveApp);
