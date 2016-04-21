const mongoose = require('mongoose');

var jediSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  variety: String,
  weaponPreference: String,
  lightsaberColor: String,
  handCount: { type: String, default: '2' },
  catchphrase: String
});

module.exports = mongoose.model('Jedi', jediSchema);
