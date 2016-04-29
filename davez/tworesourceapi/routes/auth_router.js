const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');

var userRouter = module.exports = exports = express.Router();

userRouter.post('/signup', jsonParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;
  if(!password) return res.status(500).json({msg: 'you must not have a blank password field'});

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;
  newUser.save((err, data) => {
    debugger;
    if(err) return res.status(500).json({msg: 'user creation failed'});
    res.json({msg: 'user created'});
  });
});

userRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({username: req.auth.username}, (err, user) => {
    if(err) return res.status(500).json({msg: 'ERROR with authentication process'});
    if(!user) return res.status(500).json({msg: 'authentication failed'});
    if(!user.compareHash(req.auth.password)) return res.status(500).json({msg: 'authentication failed'});

    res.json({msg: 'user has been authenticated'});
  });
});
