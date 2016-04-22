const Router = require('express').Router;
const Mission = require(__dirname + '/../models/mission');
var missionRouter = module.exports = Router();
const bodyParser = require('body-parser').json();

missionRouter.get('/mission', (req, res) => {
  Mission.find(null, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'Mission failed on the server!'});
    }

    res.status(200).json(data);
  });
});

missionRouter.post('/mission', bodyParser, (req, res) => {
  var newMission = new Mission(req.body);
  newMission.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: "Mission failed on the server!"});
    }

    res.status(200).json(data);
  });
});

missionRouter.put('/mission/:id', bodyParser, (req, res) => {
  var missionData = req.body;
  delete missionData._id;
  Mission.update({_id: req.params.id }, missionData, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'Failed! You did not update the mission!'});
    }
    res.status(200).json({msg: 'New Orders! You\'ve updated a mission!'});
  });
});

missionRouter.delete('/mission/:id', (req, res) => {
  Mission.remove({_id: req.params.id}, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'Failed! You did not update the mission!'});
    }
    res.status(200).json({msg: 'Mission canceled'});
  });
});
