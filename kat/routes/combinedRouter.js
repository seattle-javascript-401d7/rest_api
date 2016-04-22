const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Pet = require(__dirname + '/../models/petModel.js');
const Sandwich = require(__dirname + '/../models/sandwichModel.js');
const errorHandler = require(__dirname + '/../lib/errorHandle.js');

var warsRouter = module.exports = new Router();

warsRouter.get('/war', (req, res) => {
  var petTotal = [];
  var sandwichTotal = [];
  var lastSandwich = {};

function findPet(callback) {
    Pet.find(null, (err, data) => {
      if (err) return errorHandler(err, res);
      petTotal = data;
      callback(petTotal);
    });
  }

function findSandwich(callback) {
  Sandwich.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    sandwichTotal = data;
    lastSandwich = sandwichTotal[sandwichTotal.length - 1];
    console.log(lastSandwich._id);
    callback(sandwichTotal, lastSandwich);
  });
}
  function war() {
    findPet((petTotal) => {
      findSandwich((sandwichTotal, lastSandwich) => {
        console.log(petTotal.length + 'pet');
        console.log(sandwichTotal.length + 'sand');
        if (petTotal.length < sandwichTotal.length) res.status(200).json({ msg: 'your sandwich is safe' });
        else {
          Sandwich.findByIdAndUpdate(lastSandwich._id, { $set: { yumFactor: 0 }}, function (err, sandwich) {
            if (err) return errorHandler(err, res);
            res.send(sandwich);
          });
        }
      });
    });
  }
  war();
});
