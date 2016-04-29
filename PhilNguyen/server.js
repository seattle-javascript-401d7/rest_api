'use strict';
require('dotenv').config();
if (!process.env.APP_SECRET) {
  throw new Error('YOu need to set the APP_SECRET environment variable');
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const heroRouter = require(__dirname + '/app/routes/superhero_routes');
const villainRouter = require(__dirname + '/app/routes/villain_routes');
const strongestRouter = require(__dirname + '/app/routes/strongest_routes');
const authorizationRoutes = require(__dirname + '/app/routes/authorization_routes');
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/superhero_db');

app.use('/api', authorizationRoutes);
app.use('/api', strongestRouter);
app.use('/api', heroRouter);
app.use('/api', villainRouter);

module.exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
