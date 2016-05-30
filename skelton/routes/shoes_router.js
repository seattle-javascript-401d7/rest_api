const Router = require('express').Router;
const Shoes = require(__dirname + '/../models/shoes');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/error_handler');

var shoesRouter = module.exports = Router();

shoesRouter.post('/shoes', bodyParser, (req, res) => {
  var newShoes = new Shoes(req.body);
  newShoes.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

shoesRouter.get('/shoes', (req, res) => {
  Shoes.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

shoesRouter.put('/shoes/:id', bodyParser, (req, res) => {
  var shoeData = req.body;
  delete shoeData._id;
  Shoes.update({_id: req.params.id}, shoeData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({msg: 'nice shoes!'});
  });
});

shoesRouter.delete('/shoes/:id', (req, res) => {
  Shoes.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({msg: 'those need to go to Goodwill.'});
  });
});
