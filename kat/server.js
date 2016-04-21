const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const petRouter = require(__dirname + '/routes/petRouter.js');
const sandwichRouter = require(__dirname + '/routes/sandwichRouter.js');
var mongoose = require('/../models/petModel.js');
var mongoose = require('/../models/sandwichModel.js');
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pet_db' || 'mongodb://localhost/sandwich_db');

app.use('/api', petRouter);
app.use('/api', sandwichRouter);
app.listen(PORT, () => console.log('server alive at' + PORT));
