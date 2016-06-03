const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');
const jwToken = require(__dirname + '/../lib/jwt_auth');

var router = module.exports = exports = express.Router();

router.route('/signup')

.post(jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'no password provided' });

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'Could not create user' });

    user.generateToken(function(err, token) {
      if (err) return res.status(500).json({ msg: 'Could not generate token' });

      res.json({ token });
    });
  });
});

router.route('/signin')

.get(basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'Could not authenticate' });

    if (!user) return res.status(500).json({ msg: 'Could not authenticate' });

    if (!user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'Incorrect password' });
    }
    user.generateToken(function(err, token) {
      if (err) {
        return res.status(500).json({ msg: 'Could not generate token, Please sign in later' });
      }
      res.json({ token });
    });
  });
});

router.route('/profile')
.get(jwToken, (req, res) => {
  console.log(res);
  res.json({ username: req.user.username });
});
