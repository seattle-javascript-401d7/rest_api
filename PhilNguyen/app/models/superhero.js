'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SuperheroSchema = new Schema({
  name: { type: String, unique: true },
  powers: String,
  strength: Number,
  energy: Number,
  dexterity: Number,
  intelligence: Number,
  weakness: String
});

module.exports = mongoose.model('Superhero', SuperheroSchema);
