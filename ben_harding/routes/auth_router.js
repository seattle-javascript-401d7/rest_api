const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');
const User = require(__dirname + '/../models/user');

var authRouter = module.exports = exports = Router();

authRouter.post('/signup', bodyParser, (req, res) => {
  var password = req.body.password;
  req.body.password = null;
  if (!password) return res.status(500).json({ msg: 'no blank passwords' });
  var newUser = new User(req.body);
  newUser.generateHash(password);
  password = null;
  newUser.save((err, data) => {
    if (err) return res.status(500).json({ msg: 'could not create user' });

    // TODO send a jwt on sucessful user creation
    res.json({ msg: 'user created' });
  });
});

authRouter.get('/signin', basicHTTP, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) return res.status(500).json({ msg: 'the slothbear is unimpressed' });
    if (!user) return res.status(500).json({ msg: 'the slothbear is unimpressed' });
    if (!user.compareHash(req.auth.password)) {
      return res.status(500).json({ msg: 'the slothbear is unimpressed' });
    }

    res.json({ msg: 'delicious ants found!' });
  });
});
