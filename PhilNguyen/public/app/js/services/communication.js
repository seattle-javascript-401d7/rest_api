var baseUrl = require('../config').baseUrl;

module.exports = function(app) {
  app.factory('theStrongest', ['$http', function($http) {
    return {
      superheroData: [],
      villainData: [],
      getStrongestHero: function() {
        this.superheroData.splice(0);
        $http.get(baseUrl + '/api/strongestHero')
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.superheroData.push(res.data[i]);
          }
        });
      },
      getStrongestVillain: function() {
        this.villainData.splice(0);
        $http.get(baseUrl + '/api/strongestVillain')
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.villainData.push(res.data[i]);
          }
        });
      }
    };
  }]);
};
