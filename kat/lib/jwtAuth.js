const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.header.token, process.env.APP_SECRET, function(err, decoded) {
    if (err) return res.status(403).json({ msg: 'Error with authentications' });

    User.findOne({ findHash: decoded.idd }, function(err, data) {
      if (err) return res.status(403).json({ msg: 'Error with authentication' });
      if (!data) return res.status(403).json({ msg: 'Not proper authentication' });
      req.user = data;
      next();
    });
  });
};
