var url = require('../../config.js').url;
module.exports = function(app) {
  app.controller('WineController', ['resource', 'partyPlan', function(Resource, partyPlan) {
    this.wine = [];
    this.service = partyPlan;
    this.serviceAddPairing = partyPlan.addPairing.bind(partyPlan);
    this.totalPairing = 0;
    this.addPairing = function() {
      this.totalPairing++;
    };
    this.errors = [];
    var remote = new Resource(this.wine, this.errors, url + '/api/wine');

    this.getAll = function() {
      remote.getAll();
    };

    this.createWine = function() {
      remote.create(this.newWine)
      .then(() => {
        this.newWine = null;
      });
    }.bind(this);

    this.deleteWine = function(wine) {
      remote.removeParty(wine);
    };

    this.updateWine = function(wine) {
      remote.update(wine)
      .then(() => {
        wine.editing = false;
      });
    };
  }]);
};
