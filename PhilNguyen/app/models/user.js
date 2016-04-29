'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  findHash: { type: String, unique: true }
});

userSchema.methods.generateHash = function(password) {
  return this.password = bcrypt.hashSync(password, 8);
};

userSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateFindHash = function(cb) {
  let tries = 0;
  let timeout;
  let _generateFindHash = () => {
    let hash = crypto.randomBytes(32);
    this.findHash = hash.toString('hex');
    this.save((err) => {
      if (err) {
        if (tries > 9) {
          return cb(new Error('could not generate hash'));
        }
        return timeout = setTimeout(() => {
          _generateFindHash();
          tries++;
        }, 1000);
      }

      if (timeout) clearTimeout(timeout);
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
