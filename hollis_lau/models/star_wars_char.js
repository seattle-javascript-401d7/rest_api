const mongoose = require("mongoose");

var starWarsCharSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weapon: String,
  planet: String
});

module.exports = mongoose.model("starWarsChar", starWarsCharSchema);
