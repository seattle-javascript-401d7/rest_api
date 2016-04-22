const Router = require('express').Router;
const Lion = require(__dirname + '/../models/lions');
const bodyParser = require('body-parser');
const errorHandler = require(__dirname + '/../errorHandler');
var lionsRouter = new Router();

lionsRouter.get('/lions', bodyParser, (req, res) => {
  Lion.find(null, (err, data) => {
    if (err) return errorHandler(err);
    res.status(200).json(data);
  });
});

lionsRouter.post('/lions', bodyParser, (req, res) => {
  var newLion = new Lion(req.body);
  newLion.save( (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

lionsRouter.put('/lions/:id', bodyParser, (req, res) => {
  var lionData = req.body;
  delete lionData._id;
  Lion.update({ _id: req.params.id }, lionData, (err) => {
    if (err) return errorHandler(err);
    res.status(200).json({ msg: 'lions db updated' });
  });
});

lionsRouter.delete('/lions/:id', (req, res) => {
  Lion.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err);
    res.status(200).json({ msg: 'lion removed from db' });
  });
});

module.exports = lionsRouter;
