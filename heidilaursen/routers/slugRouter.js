//this only calls the instance of router from express (nothing else)
const Router = require('express').Router;
const Slug = require(__dirname + '/../models/slug');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var slugRouter = module.exports = new Router();

//resource bears that i'm accessing
slugRouter.post('/slug', bodyParser, (req, res) => {
  //parsed json
  // var bearData = req.body;
  var newSlug = new Slug (req.body);
  //.save mongoose method
  newSlug.save(function (err, data) {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({msg: 'great job!'});
  });
});

slugRouter.get('/slug', (req, res) => {
  Slug.find(null, (err, data) => {
    if(err) return serverErrorHandler(err, res);

    slugRouter.listen(200).json(data);
  });
});
