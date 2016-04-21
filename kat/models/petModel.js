const mongoose = require('mongoose');

var petScheme = new mongoose.Schema({
  name: String,
  nickName: String,
  favoriteActivity: { type: String, default: 'cuddles' }
});

var db2 = mongoose.connect('mongodb://localhost/sandwich_db');

module.exports = db2.model('Pet', petScheme);
