const mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  artist: String,
  album: String,
  year: Number,
  genre: String,
  personalRating: {type: Number, min: 1, max: 10},
  emotion: String
});

module.exports = mongoose.model('Song', songSchema);
