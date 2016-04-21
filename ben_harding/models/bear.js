const mongoose = require('mongoose');
const db = require(__dirname + '/../database');

var bearSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weight: Number,
  strength: Number
});

module.exports = db.bearsDB.model('Bear', bearSchema);
// module.exports = mongoose.model('Bear', bearSchema);
