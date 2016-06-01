const angular = require('angular');
const practiceApp = angular.module('practiceApp', []);

require('./wine')(practiceApp);
require('./cheese')(practiceApp);
require('./services')(practiceApp);
