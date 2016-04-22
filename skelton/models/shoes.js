const mongoose = require('mongoose');

var shoesSchema = new mongoose.Schema({
  brand: String,
  type: {type: String, default: 'Oxfords'},
  color: String,
  slipOn: {type: Boolean, default: false},
  polish: {type: String, default: 'dress'}
});
module.exports = mongoose.model('Shoes', shoesSchema);
