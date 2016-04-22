'use strict';

const Router = require('express').Router;
const Song = require(__dirname + '/../models/song');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var songRouter = module.exports = Router();

songRouter.get('/songs', (req, res) => {
  Song.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

songRouter.post('/songs', bodyParser, (req, res) => {
  var newSong = new Song(req.body);
  newSong.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

songRouter.put('/songs/:id', bodyParser, (req, res) => {
  var songData = req.body;
  delete songData._id;
  Song.update({ _id: req.params.id }, songData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'song edit complete' });
  });
});

songRouter.delete('/songs/:id', (req, res) => {
  Song.remove({ _id: req.params.song }, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'song delete complete' });
  });
});
