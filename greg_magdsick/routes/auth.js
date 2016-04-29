const express = require('express');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/http');
const User = require(__dirname + '/../models/user');

var router = module.exports = exports = express.Router();

router.get('/signin', basicHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err || !user || !user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'Failed to authenticate' });
    }
    user.generateToken((err, token) => {
        if (err) {
          return res.status(500).json(
            { msg: 'could not generate security token, please signin later'
          });
        }
        res.json(token);
      });
    }
  );
});

router.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;
  if (!password) return res.status(500).json({ msg: 'Your passwrod was empty, please try again' });
  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'couldn\'t create user' });
    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'couldn\'t create token, please sign up later' });
      res.json({ token });
    });
  });
});
