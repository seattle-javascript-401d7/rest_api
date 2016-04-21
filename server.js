const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pilotRouter = require(__dirname + '/routes/pilotsrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pilots_db');

app.use('/api', pilotRouter);
app.listen(port, () => console.log('Server spinning on Port:' + port));
