var url = require('../../config').url;
module.exports = function(app) {
  app.controller('CheeseController', ['resource', function(Resource) {
    this.cheeses = [];
    this.errors = [];
    this.totalPairing = 0;
    this.addPairing = function() {
      this.totalPairing++;
    };

    var remote = new Resource(this.cheese, this.errors, url + '/api/cheese');

    this.getAll = function() {
      remote.getAll();
    };

    this.createCheese = function() {
      remote.create(this.newCheese)
      .then(() => {
        this.newCheese = null;
      });
    }.bind(this);

    this.deleteCheese = function(cheese) {
      remote.removeResource(cheese);
    };

    this.updateCheese = function(cheese) {
      remote.update(cheese)
      .then(() => {
        cheese.editing = false;
      });
    };
  }]);
};
