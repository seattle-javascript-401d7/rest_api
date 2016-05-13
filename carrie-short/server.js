if (!process.env.APP_SECRET) {
  throw new Error('You need to set the APP_SECRET environment variable');
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dinosaursRouter = require(__dirname + '/routes/dinosaursrouter');
const politiciansRouter = require(__dirname + '/routes/politiciansrouter');
const versusRouter = require(__dirname + '/routes/versusrouter');
const authRouter = require(__dirname + '/routes/authrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/political_dinos_db');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});
app.use('/api', dinosaursRouter);
app.use('/api', politiciansRouter);
app.use('/api', versusRouter);
app.use('/api', authRouter);
app.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});
module.exports = app.listen(PORT, () => {
  console.log('server up on port ' + PORT);
});
