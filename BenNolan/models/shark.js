const mongoose = require('mongoose');

var sharkSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  speed: { type: String, default: '60' },
  preyPreference: { type: String, default: 'fish' }
});

module.exports = mongoose.model('Shark', sharkSchema);
