const User = require(__dirname + '/models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Sorry, could not authenticate user' });

    User.findOne({ _id: decoded.idd }, (err, data) => {
      if (err) return res.status(403).json({ msg: 'Sorry could not authenticate user' });
      if (!data) return res.status(403).json({ msg: 'Sorry, user not found' });

      req.user = data;
      next();
    });
  });
};
