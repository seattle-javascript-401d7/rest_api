const mongoose = require("mongoose");

var starTrekCharSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  gender: String,
  rank: String,
  weapon: { type: String, default: "Phaser" },
  power: { type: Number, required: true },
  ship: { type: String, default: "Enterprise" }
});

module.exports = exports = mongoose.model("starTrekChar", starTrekCharSchema);
