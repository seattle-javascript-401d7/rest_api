const Router = require('express').Router;
const Dinosaur = require(__dirname + '/../models/dinosaur');
const bodyParser = require('body-parser').json();
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const dinosaursRouter = module.exports = new Router();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');

dinosaursRouter.post('/dinosaurs', jwtAuth, bodyParser, (req, res) => {
  var newDinosaur = new Dinosaur(req.body);
  newDinosaur.userID = req.user._id;
  newDinosaur.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

dinosaursRouter.get('/dinosaurs', (req, res) => {
  Dinosaur.find({}, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

dinosaursRouter.put('/dinosaurs/:id', jwtAuth, bodyParser, (req, res) => {
  var dinosaurData = req.body;
  delete dinosaurData._id;
  Dinosaur.update({ _id: req.params.id }, dinosaurData, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

dinosaursRouter.delete('/dinosaurs/:id', jwtAuth, (req, res) => {
  Dinosaur.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({
      msg: 'dinosaur has gone extinct'
    });
  });
});
