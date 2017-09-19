'use strict';
const Router = require('express').Router;
const Motor = require(__dirname + '/../models/motor');
const bodyParser = require('body-parser').json();
const myRouter = module.exports = new Router();

myRouter.get('/motor', (req, res) => {
  Motor.find(null, (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).json(data);
  });
});

myRouter.post('/motor', bodyParser, (req, res) => {
  var newMotor = new Motor(req.body);
  newMotor.save((err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('POST to motor successful');
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

myRouter.delete('/motor/:model', (req, res) => {
  Motor.remove({ model: req.params.model }, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Deletion Successful');
  });
});
