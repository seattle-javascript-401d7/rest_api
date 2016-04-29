const mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  genre: String,
  year: {type: Number},
  rating: {type: String},
  runTime: {type: String},
  emotion: String
});

module.exports = mongoose.model('Movie', movieSchema);
