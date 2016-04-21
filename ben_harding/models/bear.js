const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weight: Number,
  strength: Number,
  offspring: [String]
});

module.exports = mongoose.model('Bear', bearSchema);
