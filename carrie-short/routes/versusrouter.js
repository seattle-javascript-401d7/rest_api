const Router = require('express').Router;
const Politician = require(__dirname + '/../models/politician');
const Dinosaur = require(__dirname + '/../models/dinosaur');
const versusRouter = module.exports = new Router();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');

versusRouter.get('/versus', (req, res) => {
  Politician.find({}, (err, politicianData) => {
    if (err) return serverErrorHandler(err, res);
    Dinosaur.find({}, (err, dinosaurData) => {
      if (err) return serverErrorHandler(err, res);
      res.status(200).json({
        politicians: politicianData.length,
        dinosaurs: dinosaurData.length
      });
    });
  });
});

versusRouter.get('/battle', (req, res) => {
  Politician.aggregate({
    $sample: {
      size: 2
    }
  }, (err, politicianData) => {
    if (err) return serverErrorHandler(err, res);
    Dinosaur.aggregate({
      $sample: {
        size: 2
      }
    }, (err, dinosaurData) => {
      if (err) return serverErrorHandler(err, res);
      var message;
      if (dinosaurData[0].attack >= politicianData[0].debateSkills) {
        message = dinosaurData[0].name + ' wins using '
        + dinosaurData[0].specialPower + ' on ' + politicianData[0].name;
      } else {
        message = dinosaurData[0].name + ' cowers before the power of '
        + politicianData[0].name + '\'s ' + politicianData[0].specialPower;
      }
      res.status(200).json({
        msg: message
      });
    });
  });
});
