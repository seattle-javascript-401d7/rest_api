const mongoose = require('mongoose');

var bearSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  variety: String,
  location: String,
  continent: String,
  nemesis: { type: String, default: 'poachers' }
});

module.exports = mongoose.model('Bear', bearSchema);
