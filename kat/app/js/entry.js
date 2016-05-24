const angular = require('angular');
const practiceApp = angular.module('practiceApp', []);

require('./pet')(practiceApp);
require('./sandwich')(practiceApp);
