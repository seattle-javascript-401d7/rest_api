const Router = require('express').Router;
const shoes = require(__dirname + '/../models/shoes');
const pants = require(__dirname + '/../models/pants');
const mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/outfit_db');

var wardrobeRouter = module.exports = Router();


wardrobeRouter.get('/wardrobe', (req, res) => {
  var wardrobeResult;
  shoes.find(null, (err, shoeData) => {
    if (err) console.log(err);
    pants.find(null, (err, pantsData) => {
      if (err) console.log(err);

      wardrobeResult = shoeData.length * pantsData.length;
      res.status(200).send(wardrobeResult + ' possible combinations\n');
    });
  });
});
