const Router = require('express').Router;
const Sith = require(__dirname + '/../models/sith');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/errorHandler');
var sithRouter = module.exports = Router();

sithRouter.post('/sith', bodyParser, (req, res) => {
  var newSith = new Sith(req.body);
  newSith.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});
