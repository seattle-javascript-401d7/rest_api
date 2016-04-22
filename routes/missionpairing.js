const Router = require('express').Router;
const Mission = require(__dirname + '/../models/mission');
const Pilot = require(__dirname + '/../models/pilot');
var missionPairingRouter = module.exports = Router();

missionPairingRouter.get('/missionPairing', (req, res) => {
  var missionPairingResult;

  Pilot.find(null, (err, pilotData) => {
    if (err) console.log(err);
    Mission.find(null, (err, missionData) => {
      if (err) console.log(err);

      if (pilotData.length !== missionData.length) {
        missionPairingResult = 'No go! Not an even match of Pilots and Missions!';
      } else {
        missionPairingResult = 'It\'s a Go! Send the planes out!';
      }

      res.status(200).json({
        missionPairingMessage: missionPairingResult,
        pilot: pilotData.length,
        mission: missionData.length
      });
    });
  });
});
