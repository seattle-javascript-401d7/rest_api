const mongoose = require('mongoose');

var vinylSchema = new mongoose.Schema({
  album:{type: String},
  artist:{type: String},
  purchasedAt:{type:String, default:'Amoeba'}
});

module.exports = mongoose.model('Vinyl', vinylSchema);
