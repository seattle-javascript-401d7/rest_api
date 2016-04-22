const Router = require('express').Router;
const Jedi = require(__dirname + '/../models/jedi');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/errorHandler');
var jediRouter = module.exports = Router();

jediRouter.post('/jedi', bodyParser, (req, res) => {
  var newJedi = new Jedi(req.body);
  newJedi.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});
