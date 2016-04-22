const express = require('express');
const dbErrorHandler = require(__dirname + '/../lib/db_error_handler');
const jsonParser = require('body-parser').json();

const Player = require(__dirname + '/../models/player');
var playersRouter = module.exports = exports = express.Router();

// GET
playersRouter.get('/players', (req, res) => {
  Player.find({}, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// PUT
playersRouter.put('/players/:id', jsonParser, (req, res) => {
  Player.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'put good' });
  });
});

// POST
playersRouter.post('/players', jsonParser, (req, res) => {
  var newPlayer = new Player(req.body);
  newPlayer.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// DELETE
playersRouter.delete('/players/:id', (req, res) => {
  Player.remove({ _id: req.params.id }, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'delete successful' });
  });
});
