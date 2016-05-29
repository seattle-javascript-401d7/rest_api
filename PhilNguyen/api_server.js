'use strict';
require('dotenv').config();
if (!process.env.APP_SECRET) {
  throw new Error('YOu need to set the APP_SECRET environment variable');
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const heroRouter = require(__dirname + '/routes/superhero_routes');
const villainRouter = require(__dirname + '/routes/villain_routes');
const strongestRouter = require(__dirname + '/routes/strongest_routes');
const authorizationRoutes = require(__dirname + '/routes/authorization_routes');
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/superhero_db');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});
app.use('/api', authorizationRoutes);
app.use('/api', strongestRouter);
app.use('/api', heroRouter);
app.use('/api', villainRouter);

module.exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
