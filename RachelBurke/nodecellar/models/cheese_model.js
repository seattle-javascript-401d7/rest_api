var mongoose = require('mongoose');

var cheeseSchema = new mongoose.Schema({
  name: String,
  year: String,
  country: String,
  description: String
});

module.exports = mongoose.model('Cheese', cheeseSchema);
