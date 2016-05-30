var baseUrl = require('../config');

module.exports = function(app) {
  app.factory('theStrongest', ['$http', function($http) {
    return {
      data: [],
      getStrongestHero: function() {
        $http.get(baseUrl + '/api/strongestHero')
        .then((res) => {
          this.data.push(res.data);
          return this.data;
        });
      },
      getStrongestVillain: function() {
        $http.get(baseUrl + '/api/strongestVillain')
        .then((res) => {
          this.data.push(res.data);
          return this.data;
        });
      }
    };
  }]);
};
