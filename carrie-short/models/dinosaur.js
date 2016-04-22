const mongoose = require('mongoose');

var dinoSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  diet: String,
  attack: { type: String, default: '5' },
  specialPower: { type: String, default: 'eviscerates' }
});

module.exports = mongoose.model('Dinosaur', dinoSchema);
