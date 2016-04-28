const Router = require('express').Router;
const Politician = require(__dirname + '/../models/politician');
const bodyParser = require('body-parser').json();
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const politiciansRouter = module.exports = new Router();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');

politiciansRouter.post('/politicians', jwtAuth, bodyParser, (req, res) => {
  var newPolitician = new Politician(req.body);
  newPolitician.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

politiciansRouter.get('/politicians', (req, res) => {
  Politician.find({}, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

politiciansRouter.put('/politicians/:id', jwtAuth, bodyParser, (req, res) => {
  var politicianData = req.body;
  delete politicianData._id;
  Politician.update({ _id: req.params.id }, politicianData, (err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

politiciansRouter.delete('/politicians/:id', jwtAuth, (req, res) => {
  Politician.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({
      msg: 'politician has retired from office'
    });
  });
});
