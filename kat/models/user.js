const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true }
});

userSchema.methods.generateHash = function(password) {
  this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateFindHash = function(cb) {
  var tries = 0;
  var timeout;
  var _generateFindHash = () => {
    var hash = crypto.randomBytes(32); // have created a random hash with crypto
    this.findHash = hash.toString('hex'); // stringed that hash
    this.save((err, data) => {
      if (err) {
        if (tries > 9) {
          return cb(new Error('could not generate hash'));
        }
        return timeout = setTimeout(() => {
          _generateFindHash();
          tries++;
        }, 1000);
      }
      if (timeout) clearTimeout(timeout); // see if the timeout set, and make sureit doesnt start again

      cb(null, hash.toString('hex'));
    });
  };
  _generateFindHash();
};

userSchema.methods.generateToken = function(cb) {
  this.generateFindHash(function(err, hash) {
    if (err) return cb(err);
    cb(null, jwt.sign({ idd: hash }, process.env.APP_SECRET));
  });
};

module.exports = exports = mongoose.model('User', userSchema);
