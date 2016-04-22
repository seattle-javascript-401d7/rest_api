const Router = require('express').Router;
const Pet = require(__dirname + '/../models/petModel.js');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/errorHandle.js');
var petRouter = module.exports = new Router();

petRouter.get('/pet', (req, res) => {
  Pet.find({}, (err, data) => {
    if(err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

petRouter.post('/pet', bodyParser, (req, res) => {
  var newPet = new Pet(req.body);
  newPet.save((err, data) => {
    if(err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

petRouter.put('/pet/:id', bodyParser, (req, res) => {
  var petData = req.body;
  delete petData._id;
  Pet.update({ _id: req.params.id }, petData, (err) => {
    if(err) errorHandler(err, res);
    res.status(200).json({ msg: 'Updated a pet entry with put' });
  });
});

petRouter.delete('/pet/:id', bodyParser, (req, res) => {
  Pet.findOneAndRemove({ _id: req.params.id }, (err) => {
    if(err) errorHandler(err, res);
    res.status(200).json({ msg: 'Deleted a pet entry' });
  });
});
