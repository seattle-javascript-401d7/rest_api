const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const basicHttp = require(__dirname + '/../lib/basicHttp');
const Router = require('express').Router;

var authRouter = module.exports = exports = new Router();

authRouter.post('/signUp', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;

  if (!password) return res.status(500).json({ msg: 'Please enter a password' });

  var newUser = new User(req.body);
  newUser.gnerateHash(password);
  password = null;

  newUser.save((err, user) => {
    if (err) return res.status(500).json({ msg: 'Could not create user' });
    var token = user.generateToken();
    if (err) return res.status(500).json({ msg: 'Could not generate token' });
    res.json({ token });
  });
});

authRouter.get('/signIn', basicHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'Sorry, server error. Please try again' });

    if (!user.compareHash(req.auth.password)) return res.status(500).json({ msg: 'Sorry, could not authenticate user.' });

    var token = user.generateToken();
    if (err) return res.status(500).json({ msg: 'Could not generate token' });
    res.json({ token });
  });
});
