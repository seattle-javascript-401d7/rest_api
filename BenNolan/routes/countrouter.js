const Router = require('express').Router;
const Shark = require(__dirname + '/../models/shark');
const Prey = require(__dirname + '/../models/prey');

const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var versusRouter = module.exports = Router();

versusRouter.get('/count', (req, res) => {
  Shark.find({}, (err, sharkData) => {
    if (err) return serverErrorHandler(err, res);
  Prey.find({}, (err, preyData) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({
      sharks: sharkData.length,
      prey: preyData.length
      });
    });
  });
});
