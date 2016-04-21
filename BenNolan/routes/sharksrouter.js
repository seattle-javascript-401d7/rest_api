const Router = require('express').Router;
const Whale = require(__dirname + '/../models/shark');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var whalesRouter = module.exports = Router();

whalesRouter.post('/whales', bodyParser, (req, res) => {
  var newWhale = new Whale(req.body);
  newWhale.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});
