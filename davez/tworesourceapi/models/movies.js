const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
  // _id: String,
  name: {type: String, unique: true, required: true},
  genre: String,
  year: {type: Number},
  rating: {type: String},
  runTime: {type: String},
  emotion: String
});

module.exports = mongoose.model('Movie', movieSchema);
