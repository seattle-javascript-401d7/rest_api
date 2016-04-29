const express = require('express');
const app = express();
const PORT = process.env.PORT || 7777;
const moviesRouter = require(__dirname + '/routes/moviesrouter');
const songsRouter = require(__dirname + '/routes/songsrouter');
const User = require(__dirname + '/models/user')
const mongoose = require('mongoose');
const authRouter = require(__dirname + '/routes/auth_router')

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/db');

app.use('/api', moviesRouter);
app.use('/api', songsRouter);
app.use('/api', authRouter);
app.listen(PORT, () => console.log('server up on port: ' + PORT));
