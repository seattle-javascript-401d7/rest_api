const User = require(__dirname + '/../models/user.js');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, function(err, decoded) {
    if (err) return res.status(403).json({ msg: 'Invalid token' });

    User.findOne({ findHash: decoded.idd }, function(err, data) {
      if (err) return res.status(500).json({ msg: 'Database error' });
      if (!data) return res.status(403).json({ msg: 'User not found' });
      req.user = data;
      next();
    });
  });
};

// this middleware varifies that we have a token, that it is correct
// and that we have a secret
// Invalid token
// no user
//
