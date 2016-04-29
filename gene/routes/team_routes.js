const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const express = require('express');
const dbErrorHandler = require(__dirname + '/../lib/db_error_handler');
const jsonParser = require('body-parser').json();
const Team = require(__dirname + '/../models/team');
var teamsRouter = module.exports = exports = express.Router();

// GET
teamsRouter.get('/teams', jwtAuth, (req, res) => {
  Team.find({}, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// PUT
teamsRouter.put('/teams/:id', jwtAuth, jsonParser, (req, res) => {
  Team.update({ _id: req.params.id }, req.body, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'put good' });
  });
});

// POST
teamsRouter.post('/teams', jwtAuth, jsonParser, (req, res) => {
  var newTeam = new Team(req.body);
  newTeam.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// DELETE
teamsRouter.delete('/teams/:id', jwtAuth, (req, res) => {
  Team.remove({ _id: req.params.id }, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'delete successful' });
  });
});
