const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');

var router = module.exports = exports = express.Router();

router.post('/signup', jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'Please enter password.' });

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'Could not create user.' });

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Could not generate token, sign in later.' });

      res.json({ token });
    });
  });
});

router.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'authenticat seyz no!' });

    if (!user) return res.status(500).json({ msg: 'authenticat seyz no!' });

    if (!user.compareHash(req.auth.password)) return res.status(500).json({ msg: 'authenticat seys no '}); // eslint-disable-line

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Could not generate token, sign in later.' });

      res.json({ token });
    });
  });
});
