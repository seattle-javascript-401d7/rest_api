const express = require('express');
const dbErrorHandler = require(__dirname + '/../lib/db_error_handler');
const jsonParser = require('body-parser');

const Team = require(__dirname + '/../models/team');
var teamsRouter = module.exports = exports = express.Router();

// GET
teamsRouter.get('/teams', (req, res) => {
  Team.find({}, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// PUT
teamsRouter.put('/teams/:id', jsonParser, (req, res) => {
  Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// POST
teamsRouter.post('/teams', jsonParser, (req, res) => {
  var newTeam = new Team(req.body);
  newTeam.save((err, data) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json(data);
  });
});

// DELETE
teamsRouter.delete('/teams/:id', (req, res) => {
  Team.remove({ _id: req.params.id }, (err) => {
    if (err) return dbErrorHandler(err, res);
    res.status(200).json({ msg: 'delete successful' });
  });
});
