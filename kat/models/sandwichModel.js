const mongoose = require('mongoose');

const sandwichSchema = new mongoose.Schema({
  type: String,
  ingrediants: [],
  yumFactor: { type: Number, max: 10 }
});


module.exports = mongoose.model('Sandwich', sandwichSchema);
