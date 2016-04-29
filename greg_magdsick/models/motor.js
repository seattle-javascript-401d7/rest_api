const mongoose = require('mongoose');

var motorSchema = new mongoose.Schema({
  model: { type: String, require: true, unique: true },
  displacement: Number,
  cylinders: Number,
  maxSpeed: Number
});

module.exports = mongoose.model('MotorBike', motorSchema);
