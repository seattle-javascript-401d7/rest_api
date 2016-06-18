const Router = require('express').Router;
const Movie = require(__dirname + '/../models/movies');
const bodyParser = require('body-parser').json();
const serverError = require(__dirname + '/../lib/servererror');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
var moviesRouter = module.exports = Router();

moviesRouter.post('/movies', jwtAuth, bodyParser, (req, res) => {
  console.log('user ID: ' + req.user._id);
  var newMovie = new Movie(req.body);

  newMovie.wranglerId = req.user._id;
  newMovie.save((err, data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});

moviesRouter.get('/movies', jwtAuth, (req, res) => {
  console.log('User ID: ' + req.user._id);
  Movie.find({wranglerId: req.user._id}, (err,data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});
moviesRouter.put('/movies/:id', bodyParser, (req, res) => {
  var movieData = req.body;

  delete movieData._id;
  Movie.update({_id: req.params.id}, movieData, (err) => {
    if(err) return serverError(err, res);
    res.status(200).json({ msg: 'you have updated movies' });
  });
});
moviesRouter.delete('/movies/:id', (req, res) => {
  Movie.remove({_id: req.params.id}, (err) => {
    if (err) return serverError(err, res);
    res.status(200).json({msg: 'deleted the movie'});
  });
});
moviesRouter.route('/moviessadmadglad')
    .get((req, res) => {
      Movie.find({},(err, movies) => {
        if(err) return console.error(err);
        var moviesArray = [];
        var sadArrayMovies = [];
        var madArrayMovies = [];
        var gladArrayMovies = [];

        moviesArray.push(movies);
        for(var i = 0; i < movies.length; i++) {
          if(movies[i].emotion === 'sad') {
            sadArrayMovies.push(movies[i]);
          } else if(movies[i].emotion === 'mad') {
            madArrayMovies.push(movies[i]);
          } else if(movies[i].emotion === 'glad') {
            gladArrayMovies.push(movies[i]);
          }
        }
      });
      res.end();
    });
