if (!process.env.APP_SECRET) throw new Error('Please set the APP_SECRET');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const petRouter = require(__dirname + '/routes/petRouter.js');
const sandwichRouter = require(__dirname + '/routes/sandwichRouter.js');
const warsRouter = require(__dirname + '/routes/combinedRouter.js');
const authRouter = require(__dirname + '/routes/authRouter.js');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/kat_db');

app.use('/api', petRouter);
app.use('/api', sandwichRouter);
app.use('/api', warsRouter);
app.use('/api', authRouter);
app.listen(PORT, () => console.log('server alive at' + PORT));
