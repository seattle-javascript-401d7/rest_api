const mongoose = require('mongoose');

var petScheme = new mongoose.Schema({
  name: String,
  nickName: String,
  favoriteActivity: { type: String, default: 'cuddles' },
  petID: String
});


module.exports = mongoose.model('Pet', petScheme);
