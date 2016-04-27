const express = require('express');
const User = require(__dirname + '/../models/user.js');
const bodyParser = require('body-parser').json();

var router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;
  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;
  newUser.save((err, data) => {
    if (err) return res.ststaus(500).json({ msg: 'Invalid username'});
    res.json({ msg: 'User Successfully Created!'});
  });
});
