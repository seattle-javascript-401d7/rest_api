const angular = require('angular');
const practiceApp = angular.module('practiceApp', []);

require('./wine')(practiceApp);
require('./cheese')(practiceApp);

practiceApp.factory('cfStore', ['$rootScope', function($rs) {
  return {
    count: 0,
    addCount: function() {
      this.count++;
    }
  };
}]);

practiceApp.controller('CountCtrl', ['cfStore', function(cfStore) {
  this.counter = cfStore;
  this.getCount = cfStore.getCount.bing(cfStore);
  this.add = cfStore.addCount.bind(cfStore);
}]);
