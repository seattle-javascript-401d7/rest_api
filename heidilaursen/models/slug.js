const mongoose = require('mongoose');

//.Schema() constructor function of mongoose
var slugSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  variety: {type: String},
  food: {type: String, default: 'spinach'}
});

module.exports = mongoose.model('Slug', slugSchema);
