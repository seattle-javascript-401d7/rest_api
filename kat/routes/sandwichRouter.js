const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Sandwich = require(__dirname + '/../models/sandwichModel.js');
const errorHandler = require(__dirname + '/../lib/errorHandle.js');
const jwtAuth = require(__dirname + '/../lib/jwtAuth.js');
var sandwichRouter = module.exports = new Router();

// NON-Crub endpoint
// Find any  you could include the highest rated yumFactor for a sandwich
// or see if there are more pets than sandwiches, if yes then sandwiches delete one

sandwichRouter.get('/sandwich/mostyum', (req, res) => {
  Sandwich.find( { yumFactor: { $gt: 5 } } ).count((err, count) => {
    if (err) errorHandler(err, res);
    res.status(200)
    .json({ msg: 'There are ' + count + ' sandwiches with a yumFactor above a 5/10' });
  });
});


sandwichRouter.post('/sandwich', jwtAuth, bodyParser, (req, res) => {
  var newSandwich = new Sandwich(req.body);
  newSandwich.sandwichID = req.user._id;
  newSandwich.save((err, data) => {
    if (err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

sandwichRouter.get('/sandwich', jwtAuth, (req, res) => {
  Sandwich.find({ sandwichID: req.user._id }, (err, data) => {
    if (err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

sandwichRouter.put('/sandwich/:id', jwtAuth, bodyParser, (req, res) => {
  var sandwichData = req.body;
  delete sandwichData._id;
  Sandwich.update({ _id: req.params.id }, sandwichData, (err) => {
    if (err) errorHandler(err, res);
    res.status(200).json({ msg: 'Updated a sandwich' });
  });
});

sandwichRouter.delete('/sandwich/:id', jwtAuth, bodyParser, (req, res) => {
  Sandwich.remove({ _id: req.params.id }, (err) => {
    if (err) errorHandler(err, res);
    res.status(200).json({ msg: 'Ate a sandwich' });
  });
});
