const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const moviesRouter = require(__dirname + '/routes/moviesrouter');
const songsRouter = require(__dirname + '/routes/songsrouter');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/db');

app.use('/api', moviesRouter);
app.use('/api', songsRouter);
app.listen(PORT, () => console.log('server up on port: ' + PORT));
