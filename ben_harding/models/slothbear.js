const mongoose = require('mongoose');

var slothbearSchema = new mongoose.Schema({
  name: String,
  gender: String,
  weight: Number,
  strength: Number,
  offspring: [String]
});

module.exports = mongoose.model('Slothbear', slothbearSchema);
