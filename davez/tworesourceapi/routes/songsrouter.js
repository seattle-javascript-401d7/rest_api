const Router = require('express').Router;
const Song = require(__dirname + '/../models/songs');
const bodyParser = require('body-parser').json();
const serverError = require(__dirname + '/../lib/servererror');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var songsRouter = module.exports = Router();

songsRouter.post('/songs', jwtAuth, bodyParser, (req, res) => {
  var newSong = new Song(req.body);

  newSong.wranglerId = req.user._id;
  newSong.save((err, data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});
songsRouter.get('/songs', jwtAuth, (req, res) => {
  Song.find({wranglerId: req.user._id}, (err, data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});
songsRouter.put('/songs/:id', bodyParser, (req, res) => {
  var songData = req.body;

  delete songData._id;
  Song.update({_id: req.params.id}, songData, (err) => {
    if(err) return serverError(err, res);
    res.status(200).json({ msg: 'you have updated songs' });
  });
});
songsRouter.delete('/songs/:id', (req, res) => {
  Song.remove({_id: req.params.id}, (err) => {
    if(err) return serverError(err, res);
    res.status(200).json({ msg: 'deleted the song' });
  });
});
songsRouter.route('/sadmadglad')
    .get((req, res) => {
      Song.find({},(err, songs) => {
        if(err) return console.error(err);
        var songArray = [];
        var sadArray = [];
        var madArray = [];
        var gladArray = [];

        songArray.push(songs);
        for(var i = 0; i < songs.length; i++) {
          if(songs[i].emotion === 'sad') {
            sadArray.push(songs[i]);
          } else if(songs[i].emotion === 'mad') {
            madArray.push(songs[i]);
          } else if(songs[i].emotion === 'glad') {
            gladArray.push(songs[i]);
          }
        }
      });
      res.end();
    });
