/* eslint-env mocha */
const Router = require('express').Router;
const Tiger = require(__dirname + '/../../models/tigers');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../../lib/errorHandler');
var tigersRouter = new Router();

tigersRouter.get('/tigers', (req, res) => {
  Tiger.find(null, (err, data) => {
    if (err) return errorHandler(err);
    res.status(200).json(data);
  });
});

tigersRouter.post('/tigers', bodyParser, (req, res) => {
  var newTiger = new Tiger(req.body);
  newTiger.save( (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

tigersRouter.put('/tigers/:id', bodyParser, (req, res) => {
  var tigerData = req.body;
  delete tigerData._id;
  Tiger.update({ _id: req.params.id }, tigerData, (err) => {
    if (err) return errorHandler(err);
    res.status(200).json({ msg: 'tigers db updated' });
  });
});

tigersRouter.delete('/tigers/:id', (req, res) => {
  Tiger.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err);
    res.status(200).json({ msg: 'tiger removed from db' });
  });
});

module.exports = exports = tigersRouter;
