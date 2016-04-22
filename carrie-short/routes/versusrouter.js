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
