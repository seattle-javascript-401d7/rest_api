const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

var wineSchema = new mongoose.Schema({
  name: String,
  year: String,
  country: String,
  grapes: String,
  description: String
});

module.exports = mongoose.model('Wine', wineSchema);
