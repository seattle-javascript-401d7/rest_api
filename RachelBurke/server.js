var express = require('express');
var winesRouter = require(__dirname + '/../nodecellar/routes/winesrouter');
var cheeseRouter = require(__dirname + '/../nodecellar/routes/cheeserouter');
var PORT = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/wines_db');
var app = express();

app.use('/api', winesRouter);
app.use('/api', cheeseRouter);

app.listen(PORT, () =>
  console.log('server up on port:' + PORT));
