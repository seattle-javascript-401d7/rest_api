const Router = require('express').Router;
const Pilot = require(__dirname + '/../models/pilot');
var pilotRouter = module.exports = Router();
const bodyParser = require('body-parser').json();

pilotRouter.get('/pilot', (req, res) => {
  Pilot.find(null, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'Server error! You\'ve lost that lovin\' feelin\'' });
    }

    res.status(200).json(data);
  });
});

pilotRouter.post('/pilot', bodyParser, (req, res) => {
  var newPilot = new Pilot(req.body);
  newPilot.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Server error! You\'ve lost that lovin\' feelin\'' });
    }

    res.status(200).json(data);
  });
});

pilotRouter.put('/pilot/:id', bodyParser, (req, res) => {
  var pilotData = req.body;
  delete pilotData._id;
  Pilot.update({_id: req.params.id}, pilotData, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'Pilot not updated.'});
    }

    res.status(200).json({msg: 'Pilot updated...time for a new mission'})
  });
});

pilotRouter.delete('/pilot/:id', (req, res) => {
  Pilot.remove({_id: req.params.id}, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'Pilot not updated.'});
    }

    res.status(200).json({msg: 'Pilot Honorably Discharged'});
  });
});
