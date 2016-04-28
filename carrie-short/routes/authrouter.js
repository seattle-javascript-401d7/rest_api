const Router = require('express').Router;
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');
const authRouter = module.exports = exports = new Router();

authRouter.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'missing password' });

  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'could not create user' });
    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'could not generate token, try again later' });
      res.json({ token });
    });
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'there was an error' });
    if (!user) return res.status(500).json({ msg: 'no such username found' });
    if (!user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'incorrect password' });
    }
    user.generateToken((err, token) => {
      if (err) return res.status(500).json({ msg: 'could not generate token, try again later' });
      res.json({ token });
    });
  });
});
