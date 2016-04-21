'use strict';
const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require(__dirname + '/app/routes/routes');
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/superhero_db');

app.use('/api', router);

app.listen(PORT, () => console.log('server up on port: ' + PORT));
