const Router = require('express').Router;
const Slug = require(__dirname + '/../../models/slug');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + './../../lib/errorHandler');
var slugRouter = module.exports = new Router();

slugRouter.post('/slug', bodyParser, (req, res) => {
  var newSlug = new Slug(req.body);
  newSlug.save((err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'great job!' });
  });
});

slugRouter.get('/slug', (req, res) => {
  Slug.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    slugRouter.listen(200).json(data);
  });
});
