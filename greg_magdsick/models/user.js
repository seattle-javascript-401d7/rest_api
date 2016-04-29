const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  findHash: { type: String, unique: true }
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 9);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.findCompareHash = function(cb) {
  var attempts = 0;
  var timeout;
  var _generateFindHash = () => {
    var hash = crypto.randombytes(32);
    this.findHash = hash.toString('hex');
    this.save((err) => {
      if (err) {
        if (attempts > 4) {
          return cb(new Error('could not generate hash'));
        }
        return timeout = setTimeout(() => {
          _generateFindHash();
          attempts++;
        }, 1000);
      }
      if (timeout) clearTimeout(timeout);
      cb(null, hash.toString('hex'));
    });
  };
};

userSchema.methods.generateToken = function(cb) {
  this.generateFindHash((err, hash) => {
    if (err) return cb(err);
    cb(null, jwt.sign({ idd: hash }, process.env.APP_SECRET));
  });
};

module.exports = exports = mongoose.model('user', userSchema);
