const mongoose = require('mongoose');

//.Schema() constructor function of mongoose
var rabbitSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  variety: {type: String},
  food: {type: String, default: 'parsley'}
});

module.exports = mongoose.model('Rabbit', rabbitSchema);
