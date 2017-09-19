'use strict';
const Router = require('express').Router;
const Pedal = require(__dirname + '/../models/pedal');
const bodyParser = require('body-parser').json();
const myRouter = module.exports = new Router();

myRouter.get('/pedal', (req, res) => {
  Pedal.find(null, (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).json(data);
  });
});

myRouter.post('/pedal', bodyParser, (req, res) => {
  var newPedal = new Pedal(req.body);
  newPedal.save((err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('POST to pedal successful');
  });
});

myRouter.put('/pedal/:model', bodyParser, (req, res) => {
  var pedalUpdate = req.body;
  // delete pedalUpdate._id;
  Pedal.update({ model: req.params.model }, pedalUpdate, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Update Successful');
  });
});

myRouter.delete('/pedal/:model', (req, res) => {
  Pedal.remove({ model: req.params.model }, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Deletion Successful');
  });
});
