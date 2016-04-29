const express = require('express');
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');

var router = module.exports = exports = express.Router();

router.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({msg: 'password length must be greater than zero.'});

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'username invalid'});
    };

    user.generateToken(function(err, token) {
      if (err) return res.status(500).json({msg: 'could not generate security token; sign in later'});

      res.json({jwt: token});
    });
  });
});

router.get('/signin', basicHTTP, (req, res) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if (err) return res.status(412).json({
      msg: 'required condition not met'
    });
      if (!user) return res.status(412).json({
        msg: 'required condition not met'
      });

      if (!user.compareHash(req.auth.password)) return res.status(412).json({msg: 'required condition not met'});

      user.generateToken(function(err, token) {
        if (err) return res.status(500).json({msg: 'could not generate security token; sign in later'});

        res.json({jwt: token});
    });
  });
});
