const mongoose = require('mongoose');
const db = require(__dirname + '/../database');

var slothSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weight: Number,
  strength: Number
});

module.exports = db.slothsDB.model('sloth', slothSchema);
