const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Sloth = require(__dirname + '/../models/sloth');
const handleErr = require(__dirname + '/../lib/handle_err');

var slothsRouter = module.exports = Router();

slothsRouter.post('/sloths', bodyParser, (req, res) => {
  var newSloth = new Sloth(req.body);
  newSloth.save((err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

slothsRouter.get('/sloths', (req, res) => {
  Sloth.find(null, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

slothsRouter.get('/sloths/:name', (req, res) => {
  Sloth.findOne({ name: req.params.name }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

slothsRouter.put('/sloths/:name', bodyParser, (req, res) => {
  Sloth.update({ name: req.params.name }, req.body, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

slothsRouter.delete('/sloths/:name', (req, res) => {
  Sloth.findOneAndRemove({ name: req.params.name }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});
