const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Bear = require(__dirname + '/../models/bear');
const handleErr = require(__dirname + '/../lib/handle_err');

var bearsRouter = module.exports = Router();

bearsRouter.post('/bears', bodyParser, (req, res) => {
  var newBear = new Bear(req.body);
  newBear.save((err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.get('/bears', (req, res) => {
  Bear.find({}, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.put('/bears/:name', bodyParser, (req, res) => {
  Bear.update({ name: req.params.name }, req.body, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.delete('/bears/:name', (req, res) => {
  Bear.findOneAndRemove({ name: req.params.name }, (err, data) => {
    if (err) return handleErr(err, res);
    res.status(200).json(data);
  });
});
