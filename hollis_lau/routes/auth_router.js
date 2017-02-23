const router = require("express").Router();
const bodyParser = require("body-parser").json();
const User = require(__dirname + "/../models/user");
const basicHttp = require(__dirname + "/../lib/basic_http");
const errorHandler = require(__dirname + "/../lib/error_handler");

module.exports = exports = router;

router.post("/signup", bodyParser, (req, res) => {
  var newUser;

  if (!req.body.username) {
    return errorHandler(new Error("No username!"), res, 500);
  }

  if (!req.body.password) {
    return errorHandler(new Error("No password!"), res, 500);
  }

  newUser = new User(req.body);
  newUser.generateHashPass(req.body.password);
  req.body.password = null;

  newUser.save((err, user) => {
    if (err) {
      return errorHandler(err, res, 500, "Could not create user!");
    }

    user.generateToken((err, token) => {
      if (err) {
        return errorHandler(err, res, 500);
      }

      res.status(200).json({ token, msg: "New user created!" });
    });
  });
});

router.get("/signin", basicHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) {
      return errorHandler(err, res, 401, "Database error!");
    }

    if (!user) {
      return errorHandler(new Error("User not found!"), res, 401);
    }

    if (!user.compareHashPass(req.auth.password)) {
      return errorHandler(new Error("Incorrect password!"), res, 401);
    }

    user.generateToken((err, token) => {
      if (err) {
        return errorHandler(err, res, 500);
      }

      res.status(200).json({ token, msg: "Login successful!" });
    });
  });
});
