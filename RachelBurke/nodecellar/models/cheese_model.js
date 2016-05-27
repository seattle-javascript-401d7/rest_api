const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Cheese', new Schema({
  name: String,
  country: String,
  origin: String
}));
