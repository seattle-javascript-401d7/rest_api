const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Sloth = require(__dirname + '/../models/sloth');
const handleErr = require(__dirname + '/../lib/handle_err');

var slothRouter = module.exports = Router();

slothRouter.post('/sloths', bodyParser, (req, res) => {
  console.log('inside sloth post');
  var newSloth = new Sloth(req.body);
  newSloth.save((err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});
