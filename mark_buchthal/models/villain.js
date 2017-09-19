
const mongoose = require('mongoose');

var villainSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  powerLevel: { type: Number },
  superPower: [String],
  dastardlyDoGooder: { type: String }
});

module.exports = mongoose.model('Villain', villainSchema);
