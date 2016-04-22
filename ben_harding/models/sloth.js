const mongoose = require('mongoose');

var slothSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weight: Number,
  strength: Number,
  offspring: [String]
});

module.exports = mongoose.model('Sloth', slothSchema);
