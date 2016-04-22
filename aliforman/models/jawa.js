'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jawaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('Jawa', jawaSchema);
