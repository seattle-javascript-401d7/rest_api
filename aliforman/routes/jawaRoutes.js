'use strict';

const Router = require('express').Router;
const Jawa = require('../models/jawa');
const bodyParser = require('body-parser').json();
const serverErrHandler = require(__dirname + '/../lib/serverErrHandler');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var jawaRouter = module.exports = Router();

jawaRouter.get('/jawas', jwtAuth, (req, res) => {
  console.log('/jawas GET routes work!');
  Jawa.find({ userId: req.user._id }, (err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

jawaRouter.post('/jawas', jwtAuth, bodyParser, (req, res) => {
  console.log('/jawas POST route work!');
  var newJawa = new Jawa(req.body);
  newJawa.userId = req.user._id;
  newJawa.save((err, data) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json(data);
  });
});

jawaRouter.put('/jawas/:id', bodyParser, (req, res) => {
  var jawaData = req.body;
  delete jawaData._id;
  Jawa.update({ _id: req.params.id }, jawaData, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'Jawa changed!' });
  });
});

jawaRouter.delete('/jawas/:id', (req, res) => {
  Jawa.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrHandler(err, res);
    res.status(200).json({ msg: 'Nexu had a jawa snack!' });
  });
});
