const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bandRouter = require(__dirname + '/routes/bandRoutes');
const songRouter = require(__dirname + '/routes/songRoutes');
const queryRouter = require(__dirname + '/routes/bandQuery');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db');

app.use('/api', bandRouter);
app.use('/api', songRouter);
app.use('/api', queryRouter);

app.listen(PORT, () => console.log('Server listening on port:' + PORT));
