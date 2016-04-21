const mongoose = require('mongoose');

var pilotSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  callSign: { type: String, unique: true },
  jet: { type: Array },
  favoriteSong: { type: String, default: 'Danger Zone' }
});

module.exports = mongoose.model('Pilot', pilotSchema);
