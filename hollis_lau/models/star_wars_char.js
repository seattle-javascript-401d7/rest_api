const mongoose = require("mongoose");

var starWarsCharSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  gender: String,
  weapon: { type: String, required: true },
  power: { type: Number, required: true },
  planet: String
});

module.exports = mongoose.model("starWarsChar", starWarsCharSchema);
