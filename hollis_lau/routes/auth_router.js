const router = require("express").Router();
const bodyParser = require("body-parser").json();
const User = require(__dirname + "/../models/user");
const basicHttp = require(__dirname + "/../lib/basic_http");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = exports = router;

router.post("/signup", bodyParser, (req, res) => {
  var newUser;

  if (!req.body.username) {
    return serverErrorHandler(null, res, "Create a new username!");
  }

  if (!req.body.password) {
    return serverErrorHandler(null, res, "Create a new password!");
  }

  newUser = new User(req.body);
  newUser.generateHash(req.body.password);
  req.body.password = null;

  newUser.save((err) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not create user!");
    }

    res.status(200).json({ msg: "New user created!" });
  });
});

router.get("/signin", basicHttp, (req, res) => {
  User.findOne({ username: req.auth.username }, (err, user) => {
    if (err) {
      return serverErrorHandler(err, res, "Database error!");
    }

    if (!user) {
      return serverErrorHandler(null, res, "User not found!");
    }

    if (!user.compareHash(req.auth.password)) {
      return serverErrorHandler(null, res, "Incorrect password!");
    }

    res.status(200).json({ msg: "Login successful!" });
  });
});
