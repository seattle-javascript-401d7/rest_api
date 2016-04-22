const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  city: String,
  position: String,
  age: Number
});

module.exports = exports = mongoose.model('Player', playerSchema);
