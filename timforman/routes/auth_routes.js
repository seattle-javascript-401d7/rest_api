const express = require('express');
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');

var router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'Please enter a password.' });

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'Unable to create user. Please try again.' });

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Unable to create token. Please try later.' });

      res.json({ token });
    });
  });
});

router.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'Authentication failed: Server error' });

    if (!user) return res.status(500).json({ msg: 'Authentication failed: User not found' });

    if (!user.compareHash(req.auth.password)) return res.status(500).json({ msg: 'Authentication failed: Incorrect password' });

    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'Unable to create token. Try again later' });

      res.json({ token });
      res.json({ msg: 'Authorization completed.' });
    });
  });
});
