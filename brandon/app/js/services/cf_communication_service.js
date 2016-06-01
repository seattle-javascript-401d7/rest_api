module.exports = function(app) {
  app.factory('theOldRepublic', function() {
    return {
      jedis: [],
      siths: [],
      addJedi: function(jedi) {
        this.jedis.push(jedi);
      },
      addSith: function(sith) {
        this.siths.push(sith);
      }
    };
  });
};
