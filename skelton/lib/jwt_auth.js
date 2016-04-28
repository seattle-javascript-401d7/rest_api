const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, function(err, decoded) {
    if (err) return res.status(412).json({
      msg: 'required condition not met'
    });
    User.findOne({findHash: decoded.idd}, function(err, data) {
      if (err) return res.status(412).json({
        msg: 'required condition not met'
      });

      if (!data) return res.status(412).json({
        msg: 'required condition not met'
      });

      req.user = data;
      next();
    });
  });
};
