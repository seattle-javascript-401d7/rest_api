const Router = require('express').Router;
const Movie = require(__dirname + '/../models/movies');
const bodyParser = require('body-parser').json();
const serverError = require(__dirname + '/../lib/servererror');

var moviesRouter = module.exports = Router();

moviesRouter.post('/movies', bodyParser, (req, res) => {
  var newMovie = new Movie(req.body);
  newMovie.save((err, data) => {
    if(err) return serverError(err,res);
    res.status(200).json(data);
  });
});

moviesRouter.get('/movies', (req, res) => {
  Movie.find(null, (err,data) => {
    if(err) return serverError(err, res);
    res.status(200).json(data);
  });
});
moviesRouter.put('/movies/:id', bodyParser, (req, res) => {
  var movieData = req.body;
  Movie.update({_id: req.params.id}, movieData, (err) => {
    if(err) return serverError(err, res);
    res.status(200).json({msg:'you have updated movies'});
  });
});
moviesRouter.delete('/movies/:id', (req, res) => {
  Movie.remove({name: req.params.id}, (err) => {
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
            sadArrayMovies.push(movies[i])
          } else if(movies[i].emotion === 'mad') {
            madArrayMovies.push(movies[i])
          } else if(movies[i].emotion === 'glad') {
            gladArrayMovies.push(movies[i])
          }
        }
        console.log('\nMovies Array: \n');
        console.log(moviesArray);
        console.log('\nSad Array:\n' + sadArrayMovies + '\n');
        console.log('\nMad Array:\n' + madArrayMovies + '\n');
        console.log('\nGlad Array:\n' + gladArrayMovies + '\n');
        console.log('\nMovies (Not Array) : \n')
        console.log(movies);
      });
      res.end();
    });
