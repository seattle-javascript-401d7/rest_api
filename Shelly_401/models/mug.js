const mongoose = require('mongoose');

var mugSchema = new mongoose.Schema({
  place:{type: String},
  city:{type: String},
  drinkPref:{type:String, default:'ouzo'}
});

module.exports = mongoose.model('Mug', mugSchema);
