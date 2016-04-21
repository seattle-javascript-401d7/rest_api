const mongoose = require('mongoose');

var db = module.exports = exports = {};

db.bearsDB = mongoose.createConnection('mongodb://localhost/bearsDB');
db.slothsDB = mongoose.createConnection('mongodb://localhost/slothsDB');
