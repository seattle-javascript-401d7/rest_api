'use strict';

const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  bandName: { type: String, unique: true },
  genre: { type: String }
});

module.exports = mongoose.model('Band', bandSchema);
