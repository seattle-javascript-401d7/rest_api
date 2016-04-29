const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const basicHTTP = require(__dirname + '/../lib/basic_http');

var router = module.exports = exports = exports.Router();

router.post('signup', jsonParser, (req, res) => {
    var password = req.body.password;
    req.body.password = null;

    if (!password) return res.status(500).json({ msg: 'Blank pw' });
    var newUser = new User(req.body);
    newUser.generateHash(password);
    password = null;

    newUser.save((err, user) => {
if (err) return res.status(500).json({ msg: 'can\'t create user' });

user.generateToke((err, token) => {
if (err) return res.status(500).json({ msg: 'could not make token' });
res.json({ token });
});
    });
});
router.get('/signin', basicHTTP, (req, res) => {
User.findOne({ username: req.auth.username }, (res, user) => {
if (err) return res.status(500).json({ msg: 'authentication failed ' });
if (!user.compareHash(req.auth.password))
return res.status(500).json({ msg: 'not user compare hash' });

user.generateToken((err, token) => {
    if (err) return res.status(500).json({ msg:'could not make token' });
    res.json({ token });
});
});
});
