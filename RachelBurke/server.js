const express = require('express');
const app = express();
const PORT = 3000;
const winesRouter = require(__dirname + '/nodecellar/routes/winesrouter.js');
const cheeseRouter = require(__dirname + '/nodecellar/routes/cheeserouter.js');
const pairingRouter = require(__dirname + '/nodecellar/routes/party.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rb_db');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});


app.use('/api', winesRouter);
app.use('/api', cheeseRouter);
app.use('/api', pairingRouter);
app.listen(PORT, () => console.log('server happy at ' + PORT));
