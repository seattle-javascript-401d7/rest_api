const Router = require('express').Router;
const Pilot = require(__dirname + '/../models/pilot');
var pilotsRouter = module.exports = Router();
const bodyParser = require('body-parser').json();

pilotsRouter.get('/pilots', (req, res) => {
  Pilot.find(null, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'Server error! You\'ve lost that lovin\' feelin\'' });
    }

    res.status(200).json(data);
  });
});

pilotsRouter.post('/pilots', bodyParser, (req, res) => {
  var newPilot = new Pilot(req.body);
  newPilot.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Server error! You\'ve lost that lovin\' feelin\'' });
    }

    res.status(200).json(data);
  });
});
