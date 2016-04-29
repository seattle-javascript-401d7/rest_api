const Router = require('express').Router;
const Wine = require(__dirname + '/../models/wines_model');
const Cheese = require(__dirname + '/../models/cheese_model');
const errorHandler = require(__dirname + '/../lib/errorHandler');


var pairingRouter = module.exports = new Router();

pairingRouter.get('/pairing', (req, res) => {
  var winesTotal = [];
  var cheeseTotal = [];
  var tastyPairing = {};

  function findWine(callback) {
    Wine.find(null, (err, data) => {
      if (err) return errorHandler(err, res);
      winesTotal = data;
      callback(winesTotal);
    });
  }

  function findCheese(callback) {
    Cheese.find(null, (err, data) => {
      if (err) return errorHandler(err, res);
      cheeseTotal = data;
      tastyPairing = cheeseTotal[cheeseTotal.length - 1];
      callback(cheeseTotal, tastyPairing);
    });
  }
  function pairing() {
    findWine((wineTotal) => {
      findCheese((cheeseTotal, tastyPairing) => {
        if (wineTotal.length < cheeseTotal.length) {
          res.status(200).json({ msg: 'nice pairing!' });
        } else {
          Cheese.findByIdAndUpdate(tastyPairing._id, { $set: { tastyPairingFactor: 0 } },
            (err, cheese) => {
              if (err) return errorHandler(err, res);
              console.log(cheese);
              res.send(cheese);
            });
        }
      });
    });
  }
  pairing();
});
