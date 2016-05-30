const Router = require('express').Router;
const Song = require(__dirname + '/../models/songs');
const bodyParser = require('body-parser').json();
const serverError = require(__dirname + '/../lib/servererror');

var songsRouter = module.exports = Router();

songsRouter.post('/songs', bodyParser, (req, res) => {
  var newSong = new Song(req.body);
  newSong.save((err, data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});
songsRouter.get('/songs', (req, res) => {
  Song.find(null, (err, data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});
songsRouter.put('/songs/:id', bodyParser, (req, res) => {
  var songData = req.body;
  delete songData._id;
  Song.update({_id: req.params.id}, songData, (err) => {
    if(err) return serverError(err, res);
    res.status(200).json({msg:'you have updated songs'});
  });
});
songsRouter.delete('/songs/:id', (req, res) => {
  Song.remove({name: req.params.id}, (err) => {
    if(err) return serverError(err, res);
    res.status(200).json({msg:'deleted the song'});
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
            sadArray.push(songs[i])
          } else if(songs[i].emotion === 'mad') {
            madArray.push(songs[i])
          } else if(songs[i].emotion === 'glad') {
            gladArray.push(songs[i])
          }
        }
        console.log('\nSongs Array: \n');
        console.log(songArray);
        console.log('\nSad Array:\n' + sadArray + '\n');
        console.log('\nMad Array:\n' + madArray + '\n');
        console.log('\nGlad Array:\n' + gladArray + '\n');
        console.log('\nSongs (Not Array) : \n')
        console.log(songs);
      });
      res.end();
    });
