const Router = require('express').Router;
const Prey = require(__dirname + '/../models/prey');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var preyRouter = module.exports = Router();

preyRouter.post('/preys', bodyParser, (req, res) => {
  var newPrey = new Prey(req.body);
  newPrey.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

preyRouter.get('/preys', (req, res) => {
  Prey.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});
