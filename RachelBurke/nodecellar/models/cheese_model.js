const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

var cheeseSchema = new mongoose.Schema({
  name: String,
  country: String,
  origin: String
});

module.exports = mongoose.model('Cheese', cheeseSchema);
