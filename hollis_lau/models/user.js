const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokenHash: { type: String, unique: true }
});

userSchema.methods.generateHashPass = function (password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHashPass = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateHash = function (cb) {
  var timeout;
  var tries = 0;
  var _generateHash = () => {
    var hash = crypto.randomBytes(32);

    this.tokenHash = hash.toString("hex");

    this.save((err) => {
      if (err) {
        if (tries > 4) {
          return cb(new Error("Unable to save token hash!"));
        }

        return timeout = setTimeout(() => {
          _generateHash();
          tries++;
        }, 1000);
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      cb(null, this.tokenHash);
    });
  };

  _generateHash();
};

userSchema.methods.generateToken = function (cb) {
  this.generateHash((err, hash) => {
    if (err) {
      return cb(err);
    }

    cb(null, jwt.sign({ idd: hash }, process.env.APP_SECRET, { expiresIn: "1d" }));
  });
};

module.exports = exports = mongoose.model("User", userSchema);
