const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const bearsRouter = require(__dirname + '/routes/bears_router');
const slothsRouter = require(__dirname + '/routes/sloths_router');
const slothbearsRouter = require(__dirname + '/routes/slothbears_router');
const mateRouter = require(__dirname + '/routes/mate_router');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/slothbearDB');

app.use('/api', bearsRouter);
app.use('/api', slothsRouter);
app.use('/api', slothbearsRouter);
app.use('/api', mateRouter);

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ' + PORT));
