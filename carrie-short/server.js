const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dinosaursRouter = require(__dirname + '/routes/dinosaursrouter');
const politiciansRouter = require(__dirname + '/routes/politiciansrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/political_dinos_db');

app.use('/api', dinosaursRouter);
app.use('/api', politiciansRouter);
app.listen(PORT, () => {
  console.log('server up on port ' + PORT);
});
