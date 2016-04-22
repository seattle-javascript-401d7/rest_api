var mongoose = require('mongoose');

var wineSchema = new mongoose.Schema({
  name: String,
  year: String,
  country: String,
  description: String
});

module.exports = mongoose.model('Wine', wineSchema);
