'use strict';

const Router = require('express').Router;
const Band = require(__dirname + '/../models/band');
const Song = require(__dirname + '/../models/song');
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var bandRouter = module.exports = Router();

bandRouter.get('/bandName/:bandQuery', (req, res) => {
  var findGenre = req.params.bandQuery;
  var findSong = req.params.bandQuery;
  var results = {};
  results.bands = [];
  results.songs = [];
  Band.find({ bandName: findGenre }, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    data.forEach((band) => {
      results.bands.push(band.bandName);
    });
  });
  Song.find({ bandName: findSong }, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    data.forEach((song) => {
      results.songs.push(song.title);
    });
    res.json(results);
  });
});
