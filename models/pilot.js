const mongoose = require('mongoose');

var pilotSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  callSign: { type: String, unique: true },
  jet: { type: String, default: 'F-14' }
});

module.exports = mongoose.model('Pilot', pilotSchema);
