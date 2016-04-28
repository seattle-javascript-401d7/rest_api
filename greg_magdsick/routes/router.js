'use strict';
const Router = require('express').Router;
const Pedal = require(__dirname + '/../models/pedal');
const Motor = require(__dirname + '/../models/motor');
const bodyParser = require('body-parser').json();
const myRouter = module.exports = new Router();

myRouter.get('/pedal', (req, res) => {
  Pedal.find(null, (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).json(data);
  });
});

myRouter.get('/motor', (req, res) => {
  Motor.find(null, (err, data) => {
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

myRouter.post('/motor', bodyParser, (req, res) => {
  var newMotor = new Motor(req.body);
  newMotor.save((err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('POST to motor successful');
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

myRouter.put('/motor/:model', bodyParser, (req, res) => {
  var motorUpdate = req.body;
  // delete motorUpdate._id;
  Motor.update({ model: req.params.model }, motorUpdate, (err) => {
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

myRouter.delete('/motor/:model', (req, res) => {
  Motor.remove({ model: req.params.model }, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Deletion Successful');
  });
});

myRouter.get('/fast', (req, res) => {
  function fastPedal(value) {
    return value.maxSpeed >= 30;
  }
  function fastMotor(value) {
    return value.maxSpeed >= 150;
  }
  var pedalBikes = [];
  Pedal.find(null, (err, data) => {
    if (err) return res.status(500).send('Server Error');
    pedalBikes = data.filter(fastPedal);
    Motor.find(null, (err, data) => {
      if (err) return res.status(500).send('Server Error');
      res.status(200).send('Fast Motorbikes: \n' + data.filter(fastMotor) + '\n' +
      'FastPedalbikes: \n' + pedalBikes + '\n');
    });
  });
});
