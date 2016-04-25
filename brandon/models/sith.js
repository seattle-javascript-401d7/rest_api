const mongoose = require('mongoose');

var sithSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  ranking: String,
  weaponPreference: String,
  lightsaberColor: String,
  catchphrase: String,
  handCount: { type: String, default: '2' }
});

module.exports = mongoose.model('Sith', sithSchema);
