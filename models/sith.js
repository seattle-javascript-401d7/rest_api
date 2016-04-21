const mongoose = require('mongoose');

var sithSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  variety: String,
  weaponPreference: String,
  lightsaberColor: String,
  handCount: { type: String, default: '2' },
  catchphrase: String
});

module.exports = mongoose.model('Sith', sithSchema);
