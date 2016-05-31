module.exports = function(app) {
  app.factory('theOldRepublic', function() {
    return {
      jedis: [],
      siths: [],
      getTotal: function() {
        return this.jedis.length + this.siths.length;
      },
      addJedi: function(jedi) {
        this.jedis.push(jedi);
        console.log(this.jedis);
      },
      addSith: function(sith) {
        this.siths.push(sith);
        console.log(this.siths);
      }
    };
  });
};
