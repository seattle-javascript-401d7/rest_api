const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  findHash: {type: String}
});
userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};
userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateFindHash = function(cb) {
  var tries = 0;
  var timeout;
  var _generateFindHash = ()=> {
    var hash = crypto.randomBytes(32);
    this.findHash = hash.toString('hex');
    this.save((err, data) => {
      if(err) {
        if(tries > 9) {
          return cb(new Error('could not generate hash'));

        }
        return timeout = setTimeout(() => {
          _generateFindHash();
          tries++;
        }, 1000);
      }
      if(timeout) clearTimeout(timeout);
      cb(null, hash.toString('hex'));
    });
  };
  _generateFindHash();
};

module.exports = exports = mongoose.model('User', userSchema);
