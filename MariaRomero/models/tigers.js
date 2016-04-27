const mongoose = require('mongoose');

var tigerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  variety: String,
  location: String,
  continent: String,
  nemesis: { type: String, default: 'poachers' }
});

module.exports = mongoose.model('Tiger', tigerSchema);
