const mongoose = require('mongoose');

const sandwichSchema = new mongoose.Schema({
  type: String,
  ingrediants: [],
  yumFactor: { type: Number, max: 10 }
});

var db1 = mongoose.connect('mongodb://localhost/sandwich_db');

module.exports = db1.model('Sandwich', sandwichSchema);
