const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Sandwich = require(__dirname + '/../models/sandwichModel.js');
const errorHandler = require(__dirname + '/../lib/errorHandle.js');

var sandwichRouter = module.exports = new Router();

sandwichRouter.get('/sandwich/value', bodyParser, (req, res) => {
  Sandwich.find(yumFactor)
})

sandwichRouter.post('/sandwich', bodyParser, (req, res) => {
  var newSandwich = new Sandwich(req.body);
  newSandwich.save((err, data) => {
    if(err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

sandwichRouter.get('/sandwich', (req, res) => {
  Sandwich.find({}, (err, data) => {
    if(err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

sandwichRouter.put('/sandwich/:id', bodyParser, (req, res) => {
  var sandwichData = req.body;
  delete sandwichData._id;
  Sandwich.update({ _id: req.params.id }, sandwichData, (err) => {
    if(err) errorHandler(err, res);
    res.status(200).json({ msg: 'Updated a sandwich' });
  });
});

sandwichRouter.delete('/sandwich/:id', bodyParser, (req, res) => {
  Sandwich.findOneAndRemove({ _id: req.params.id }, (err) => {
    if(err) errorHandler(err, res);
    res.status(200).json({ msg: 'Ate a sandwich' });
  });
});
