const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  species: String,
  debateSkills: { type: String, default: '5' },
  attack: { type: String, default: '8' }
});

module.exports = mongoose.model('Bear', bearSchema);
