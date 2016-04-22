'use strict';

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String },
  bandName: { type: String }
});

module.exports = mongoose.model('Song', songSchema);
