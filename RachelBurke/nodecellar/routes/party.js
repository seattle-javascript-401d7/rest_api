const Router = require('express').Router;
const Wine = require(__dirname + '/../models/wines_model.js');
const Cheese = require(__dirname + '/..models/cheese_model.js');
const errorHandler = require(__dirname + '/../lib/errorHandler.js');

var pairingRouter = module.exports = new Router();

pairingRouter.get('/pairing', (req, res) => {
  var winesTotal = [];
  var cheeseTotal = [];
  var tastyPairing = {};

  function findWine(callball) {
    Wine.find(null, (err, data) => {
      if (err) return errorHandler(err, res);
      perTotal = data;
      callback(wineTotal);
    });
  }

  function findCheese(callback) {
    Cheese.find(null, (err, data) => {
      if (err) return errorHandler(err, res);
      cheeseTotal = data;
      tastyPairing = wineTotal[wineTotal.length - 1];
      callback(wineTotal, tastyPairing);
    });
  }
  function pairing() {
    findCheese((cheesetotal, tastyPairing) => {
      if (cheeseTotal.length < wineTotal.length) {
        res.status(200).json({ msg: 'nice pairing!' });
        } else {
          Wine.findByIdAndUpdate(tastyPairing._id, { $set: { tastyPairingFactor: 0 } },
            (err, cheese) => {
              if (err) return errorHandler(err, res);
              console.log(cheese);
              res.send(cheese);
            });
          }
        });
    };
  }
  pairing();
});
