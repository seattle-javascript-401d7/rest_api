const Router = require('express').Router;
const Politician = require(__dirname + '/../models/politician');
const Dinosaur = require(__dirname + '/../models/dinosaur');
const bodyParser = require('body-parser').json();
const versusRouter = module.exports = new Router();

versusRouter.get('/versus', (req, res) => {
  Politician.find({}, (err, politicianData) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    Dinosaur.find({}, (err, dinosaurData) => {
      if (err) {
        return res.status(500).json({
          msg: 'dude, your server errored'
        });
      }
      res.status(200).json({
        politicians: politicianData.length,
        dinosaurs: dinosaurData.length
      });
    });
  });

});
