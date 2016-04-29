const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Wine', new Schema({
  name: String,
  year: String,
  country: String,
  description: String
}));
