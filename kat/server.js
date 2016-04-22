const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const petRouter = require(__dirname + '/routes/petRouter.js');
const sandwichRouter = require(__dirname + '/routes/sandwichRouter.js');
const warsRouter = require(__dirname + '/routes/combinedRouter.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kat_db');

app.use('/api', petRouter);
app.use('/api', sandwichRouter);
app.use('/api', warsRouter);
app.listen(PORT, () => console.log('server alive at' + PORT));
