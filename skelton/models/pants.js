const mongoose = require('mongoose');

var pantsSchema = new mongoose.Schema({
  fabric: String,
  cut: {type: String, default: 'slacks'},
  color: String
});
module.exports = mongoose.model('Pants', pantsSchema);
