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
