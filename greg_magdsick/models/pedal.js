const mongoose = require('mongoose');

var pedalSchema = new mongoose.Schema({
  model: { type: String, unique: true },
  gears: Number,
  frameType: String,
  maxSpeed: Number
});

module.exports = mongoose.model('PedalBike', pedalSchema);
