const mongoose = require('mongoose');

var preySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  speed: { type: String, default: '60' }
});

module.exports = mongoose.model('prey', preySchema);
