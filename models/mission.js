const mongoose = require('mongoose');

var missionSchema = new mongoose.Schema({
  missionName: { type: String, unique: true },
  country: { type: String },
  base: { type: String, default: 'Aircraft Carrier' }
  // pilots: { type: Array }
});

module.exports = mongoose.model('Mission', missionSchema);
