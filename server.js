const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pilotRouter = require(__dirname + '/routes/pilotrouter');
const missionRouter = require(__dirname + '/routes/missionrouter');
const missionPairingRouter = require(__dirname + '/routes/missionpairing');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pilot_mission_db');

app.use('/api', pilotRouter);
app.use('/api', missionRouter);
app.use('/api', missionPairingRouter);
app.listen(port, () => console.log('Server spinning on Port:' + port));
