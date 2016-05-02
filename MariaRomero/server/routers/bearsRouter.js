const Router = require('express').Router;
const Bear = require(__dirname + '/../../models/bears');
const verifyToken = require(__dirname + '/../../lib/verifyToken');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../../lib/errorHandler');
var bearsRouter = new Router();

bearsRouter.get('/bears', (req, res) => {
  Bear.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.post('/bears', verifyToken, bodyParser, (req, res) => {
  var newBear = new Bear(req.body);
  newBear.save( (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

bearsRouter.put('/bears/:id', verifyToken, bodyParser, (req, res) => {
  var bearData = req.body;
  delete bearData._id;
  Bear.update({ _id: req.params.id }, bearData, (err) => {
    if (err) return errorHandler(err);
    res.status(200).json({ msg: 'bears db updated' });
  });
});

bearsRouter.delete('/bears/:id', verifyToken, (req, res) => {
  Bear.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err);
    res.status(200).json({ msg: 'bear removed from db' });
  });
});

module.exports = exports = bearsRouter;
