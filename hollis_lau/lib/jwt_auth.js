const jwt = require("jsonwebtoken");
const User = require(__dirname + "/../models/user");
const errorHandler = require(__dirname + "/error_handler");

module.exports = exports = function (req, res, next) {
  jwt.verify(req.headers.token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      return errorHandler(err, res, 403, "Invalid token!");
    }

    User.findOne({ tokenHash: decoded.idd }, (err, data) => {
      if (err) {
        return errorHandler(err, res, 403, "Database error!");
      }

      if (!data) {
        return errorHandler(err, res, 403, "User not found!");
      }

      req.user = data;
      next();
    });
  });
};
