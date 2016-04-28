const Router = require('express').Router;
const Prey = require(__dirname + '/../models/prey');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var preyRouter = module.exports = Router();

preyRouter.post('/preys', jwtAuth, bodyParser, (req, res) => {
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

preyRouter.put('/preys/:id', jwtAuth, bodyParser, (req, res) => {
  var preyData = req.body;
  delete preyData._id;
  Prey.update({ _id: req.params.id }, preyData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'update made!' });
  });
});

preyRouter.delete('/preys/:id', jwtAuth, (req, res) => {
  Prey.remove({ _id: req.params.id }, (err) => {
    if (err) serverErrorHandler(err, res);

    res.status(200).json({ msg: 'prey has been killed!' });
  });
});
