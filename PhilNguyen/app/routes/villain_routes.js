'use strict';
const Router = require('express').Router;
const Villain = require(__dirname + '/../models/villain');
const bodyParser = require('body-parser').json();
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

let villainRouter = module.exports = Router();

villainRouter.route('/villains')

.post(jwtAuth, bodyParser, (req, res) => {
  let newVillain = new Villain(req.body);
  newVillain.villianId = req.user._id;
  newVillain.save((err, data) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(data);
  });
})

.get(jwtAuth, (req, res) => {
  Villain.find((err, villain) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(villain);
  });
});

villainRouter.route('/villains/:villain_id')

.get(jwtAuth, (req, res) => {
  Villain.findById(req.params.villain_id, (err, villain) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(villain);
  });
})
.put(bodyParser, (req, res) => {
  Villain.findByIdAndUpdate(req.params.villain_id, req.body, (err, villain) => {
    if (err) {
      res.send(err);
    }
    villain.save((err) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json({ message: 'Successfully updated!' });
    });
  });
})
.delete((req, res) => {
  Villain.remove({
    _id: req.params.villain_id
  }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json( { message: 'Successfully deleted!' });
  });
});
