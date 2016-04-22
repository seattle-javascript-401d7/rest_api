'use strict';

const Router = require('express').Router;
const Band = require(__dirname + '/../models/band');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var bandRouter = module.exports = Router();

bandRouter.get('/bands', (req, res) => {
  Band.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

bandRouter.post('/bands', bodyParser, (req, res) => {
  var newBand = new Band(req.body);
  newBand.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

bandRouter.put('/bands/:id', bodyParser, (req, res) => {
  var bandData = req.body;
  delete bandData._id;
  Band.update({ _id: req.params.id }, bandData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'band edit complete' });
  });
});

bandRouter.delete('/bands/:id', (req, res) => {
  Band.remove({ _id: req.params.band }, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'band delete complete' });
  });
});
