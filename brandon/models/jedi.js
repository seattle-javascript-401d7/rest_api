const mongoose = require('mongoose');

var jediSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  ranking: String,
  weaponPreference: String,
  lightsaberColor: String,
  catchphrase: String,
  handCount: { type: String, default: '2' }
});

module.exports = mongoose.model('Jedi', jediSchema);
