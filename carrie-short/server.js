const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bearsRouter = require(__dirname + '/routes/bearsrouter');
const politiciansRouter = require(__dirname + '/routes/politiciansrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/political_bears_db');

app.use('/api', bearsRouter);
app.use('/api', politiciansRouter);
app.listen(PORT, () => {
  console.log('server up on port ' + PORT);
});
