const Router = require('express').Router;
const Pet = require(__dirname + '/../models/petModel.js');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/errorHandle.js');
const jwtAuth = require(__dirname + '/../lib/jwtAuth.js');
var petRouter = module.exports = new Router();

petRouter.get('/pet', jwtAuth, (req, res) => {
  Pet.find({ petID: req.user._id }, (err, data) => {
    if (err) errorHandler(err, res);
    res.status(200).json(data);
  });
});


petRouter.post('/pet', jwtAuth, bodyParser, (req, res) => {
  var newPet = new Pet(req.body);
  newPet.petID = req.user._id;
  newPet.save((err, data) => {
    if (err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

petRouter.put('/pet/:id', jwtAuth, bodyParser, (req, res) => {
  var petData = req.body;
  delete petData._id;
  Pet.update({ _id: req.params.id }, petData, (err) => {
    if (err) errorHandler(err, res);
    res.status(200).json({ msg: 'Updated a pet entry with put' });
  });
});

petRouter.delete('/pet/:id', jwtAuth, bodyParser, (req, res) => {
  Pet.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) errorHandler(err, res);
    res.status(200).json({ msg: 'Deleted a pet entry' });
  });
});
