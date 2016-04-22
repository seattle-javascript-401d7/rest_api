const Router = require('express').Router;
const Dinosaur = require(__dirname + '/../models/dinosaur');
const bodyParser = require('body-parser').json();
const dinosaursRouter = module.exports = new Router();

dinosaursRouter.post('/dinosaurs', bodyParser, (req, res) => {
  var newDinosaur = new Dinosaur(req.body);
  newDinosaur.save((err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    res.status(200).json(data);
  });
});

dinosaursRouter.get('/dinosaurs', (req, res) => {
  Dinosaur.find({}, (err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    res.status(200).json(data);
  });
});

dinosaursRouter.put('/dinosaurs/:id', bodyParser, (req, res) => {
  var dinosaurData = req.body;
  delete dinosaurData._id;
  Dinosaur.update({ _id: req.params.id }, dinosaurData, (err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    res.status(200).json(data);
  });
});

dinosaursRouter.delete('/dinosaurs/:id', (req, res) => {
  Dinosaur.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    res.status(200).json({
      msg: 'dinosaur has gone extinct'
    });
  });
});
