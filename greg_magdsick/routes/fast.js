'use strict';
const Router = require('express').Router;
const Pedal = require(__dirname + '/../models/pedal');
const Motor = require(__dirname + '/../models/motor');
const myRouter = module.exports = new Router();

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
