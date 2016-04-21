'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const heroRouter = require(__dirname + '/app/routes/superhero_routes');
const villainRouter = require(__dirname + '/app/routes/villain_routes');
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/superhero_db');

app.use('/api', heroRouter);
app.use('/api', villainRouter);

app.listen(PORT, () => console.log('server up on port: ' + PORT));
