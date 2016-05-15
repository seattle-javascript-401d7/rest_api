const mongoose = require('mongoose');

var politicianSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  party: String,
  debateSkills: { type: String, default: '5' },
  specialPower: { type: String, default: 'politics' },
  userID: String
});

module.exports = mongoose.model('Politician', politicianSchema);
