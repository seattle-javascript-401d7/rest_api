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
  Sloth.find({}, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});
