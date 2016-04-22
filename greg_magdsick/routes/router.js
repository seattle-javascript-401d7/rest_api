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
  newPedal.save((err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).json(data);
  });
});

myRouter.post('/motor', bodyParser, (req, res) => {
  var newMotor = new Motor(req.body);
  newMotor.save((err. data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).json(data);
  })
});

myRouter.put('/pedal/:id', bodyParser, (req, res) => {
  var pedalUpdate = req.body;
  delete pedalUpdate._id;
  Pedal.update({id: req.params.id}, pedalUpdate, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Update Successful');
  })
});

myRouter.put('/motor/:id', bodyParser, (req, res) => {
  var motorUpdate = req.body;
  delete motorUpdate._id;
  Motor.update({id: req.params.id}, motorUpdate, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Update Successful');
  })
});

myRouter.delete('/pedal/:id', (req, res) => {
  Pedal.remove({id: req.params.id}, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Deletion Successful');
  });
});

myRouter.delete('/motor/:id', (req, res) => {
  Motor.remove({id: req.params.id}, (err) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send('Deletion Successful');
  });
});

myRouter.get('/fast', (req, res) => {
  function fastPedal(value) {
    return value > 30;
  }
  function fastMotor(value, speed) {
    return value > 150;
  }
  var pedalBikes;
  Pedal.find(null, (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send(
      data.filter(fastPedal);
    );
  });
  Motor.find(null, (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.status(200).send(
      data.filter(fastMotor);
    );
  });
});
