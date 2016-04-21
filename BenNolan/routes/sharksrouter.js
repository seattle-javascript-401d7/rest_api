const Router = require('express').Router;
const Shark = require(__dirname + '/../models/shark');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var sharkRouter = module.exports = Router();

sharkRouter.post('/sharks', bodyParser, (req, res) => {
  var newShark = new Shark(req.body);
  newShark.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});
