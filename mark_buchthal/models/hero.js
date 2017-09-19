
const mongoose = require('mongoose');

var heroSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  powerLevel: { type: Number },
  superPower: [String],
  archNemesis: { type: String }
});

module.exports = mongoose.model('Hero', heroSchema);
