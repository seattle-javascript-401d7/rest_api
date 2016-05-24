const mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  _id: String,
  name: String,
  update: String,
  artist: String,
  album: String,
  year: Number,
  genre: String,
  personalRating: {type: Number, min: 1, max: 10},
  emotion: String
});

module.exports = mongoose.model('Song', songSchema);
