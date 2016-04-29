const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Cheese', new Schema({
  name: String,
  courntry: String,
  origin: String
}));
