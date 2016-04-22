const mongoose = require("mongoose");

var starTrekCharSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  rank: String,
  ship: { type: String, default: "Enterprise" }
});

module.exports = mongoose.model("starTrekChar", starTrekCharSchema);
