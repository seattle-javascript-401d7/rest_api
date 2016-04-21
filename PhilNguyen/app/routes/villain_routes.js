'use strict';
const Router = require('express').Router;
const Villain = require(__dirname + '/../models/villain');
const bodyParser = require('body-parser').json();

let villainRouter = module.exports = Router();

villainRouter.route('/villain')

.post(bodyParser, (req, res) => {
  let newVillain = new Villain(req.body);
  newVillain.save((err, data) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(data);
  });
})

.get((req, res) => {
  Villain.find((err, villain) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(villain);
  });
});
