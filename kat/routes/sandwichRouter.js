const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Sandwich = require(__dirname + '/../models/sandwichModel.js');

var sandwichRouter = module.exports = new Router();

sandwichRouter.post('/sandwich', bodyParser, (req, res) => {
  var newSandwich = new Sandwich(req.body);
  newSandwich.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'Server Error' });
    }
    res.status(200).json(data);
  });
});

sandwichRouter.get('/sandwich', (req, res) => {
  Sandwich.find({}, (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ msg: 'Server Error' });
    }
    res.status(200).json(data);
  });
});

sandwichRouter.put('/sandwich/:id', bodyParser, (req, res) => {
  var sandwichData = req.body;
  delete sandwichData._id;
  Sandwich.update({ _id: req.params.id }, sandwichData, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(data);
    }
    res.status(200).json({ msg: 'Updated a sandwich entry with put' });
  });
});

sandwichRouter.delete('/sandwich/:id', bodyParser, (req, res) => {
  Sandwich.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ msg: 'Deleted a sandwich entry' });
  });
});
