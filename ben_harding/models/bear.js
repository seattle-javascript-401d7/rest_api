const mongoose = require('mongoose');
const db = require(__dirname + '/../database');

var bearSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weight: Number,
  strength: Number,
  offspring: [String]
});

module.exports = db.bearsDB.model('Bear', bearSchema);
