const Router = require('express').Router;
const Jedi = require(__dirname + '/../models/jedi');
const Sith = require(__dirname + '/../models/sith');
const errorHandler = require(__dirname + '/../lib/errorHandler');
var battleRouter = module.exports = Router();

battleRouter.get('/battle', (req, res) => {
  Jedi.aggregate({ $sample: { size: 1 } }, (err, jediData) => {
    if (err) return errorHandler(err, res);
    Sith.aggregate({ $sample: { size: 1 } }, (err, sithData) => {
      if (err) return errorHandler(err, res);
      var result = Math.floor(Math.random() * 100) + 1;
      var winner;
      if (result > 50) {
        winner = sithData[0].name + ' defeated ' + jediData[0].name;
      } else {
        winner = jediData[0].name + ' defeated ' + sithData[0].name;
      }
      res.status(200).json({
        theVictor: winner
      });
    });
  });
});
