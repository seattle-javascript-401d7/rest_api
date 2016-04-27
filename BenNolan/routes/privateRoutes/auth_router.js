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

  newUser.save((err, data) => {
    if (err) return res.status(500).json({ msg: 'could not create user' });

    // TODO (xxx) send a jwt on succesful user creation
    res.json({ msg: 'user created!' });
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'not authorized' });

    if (!user) return res.status(500).json({ msg: 'not authorized' });

    if (!user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'not authorized' });
    }

    res.json({ msg: 'authorization allowed' });
  });
});
