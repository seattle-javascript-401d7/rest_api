const mongoose = require('mongoose');

var politicianSchma = new mongoose.Schema({
  name: { type: String, unique: true },
  party: String,
  debateSkills: { type: String, default: '5' },
  attack: { type: String, default: '5' },
  specialPower: { type: String, default: 'politics' }
});

module.exports = mongoose.model('Politician', politicianSchma);
