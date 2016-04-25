'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

let VillainSchema = new Schema({
  name: { type: String, unique: true },
  powerlevel: Number
});

module.exports = mongoose.model('Villain', VillainSchema);
