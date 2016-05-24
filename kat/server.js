const express = require('express');
const app = express();
const PORT = process.env.PORT || 5555;
const petRouter = require(__dirname + '/routes/petRouter.js');
const sandwichRouter = require(__dirname + '/routes/sandwichRouter.js');
const warsRouter = require(__dirname + '/routes/combinedRouter.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kat_db');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});


app.use('/api', petRouter);
app.use('/api', sandwichRouter);
app.use('/api', warsRouter);
app.listen(PORT, () => console.log('server alive at' + PORT));
