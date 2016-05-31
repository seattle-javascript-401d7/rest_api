const angular = require('angular');
const practiceApp = angular.module('practiceApp', []);

require('./wine')(practiceApp);
require('./cheese')(practiceApp);

practiceApp.factory('storageService', [ function() {
  return {
    count: 0,
    addCount: function() {
      this.count++;
    }
  };
}]);

practiceApp.controller('WineController', ['storageService', function(storageService) {
  this.service = storageService;
  this.serviceAddCount = storageService.addCount.bind(storageService);
  this.count = 0;
  this.addCount = function() {
    this.count++;
  };
}]);

practiceApp.controller('CheeseController', [ function() {
  this.count = 0;
  this.addCount = function() {
    this.count++;
  };
}]);
