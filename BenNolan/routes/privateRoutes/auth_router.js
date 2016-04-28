const express = require('express');
const User = require(__dirname + '/../../models/privateModels/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../../lib/basic_http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'you probably don\'t want a black password' });

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'could not create user' });

    user.generateToken(function(err, token) { //eslint-disable-line
      if (err) return res.status(500).json({ msg: 'could not generate token, sign in later' });

      res.json({ token });
    });
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'not authorized' });

    if (!user) return res.status(500).json({ msg: 'not authorized' });

    if (!user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'not authorized' });
    }

    user.generateToken( function(err, token) { //eslint-disable-line
      if (err) return res.status(500).json({ msg: 'could not generate toekn, sign in later' });

    res.json({ token });
    });
  });
});
