const Router = require('express').Router;
const shoesRouter = require(__dirname + '/../routes/shoes_router');
const pantsRouter = require(__dirname + '/../routes/pants_router');
const mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/outfit_db');

var wardrobeRouter = module.exports = Router();

wardrobeRouter.get('/wardrobe', (req, res) => {
  console.log('in the wardrobe');
  Pants.count(null, (err, data) =>{
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});
// need pants collection
// need count of pants collection
// need shoes collection
// need count of shoes collection
// multiply pants.count()*shoes.count() for total combinations
