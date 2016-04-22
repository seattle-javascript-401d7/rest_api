const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bearsRouter = require(__dirname + '/routers/bearsRouter');
const lionsRouter = require(__dirname + '/routers/lionsRouter');
const tigersRouter = require(__dirname + '/routers/tigersRouter');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ohMy_appDB');

app.use('/api', bearsRouter);
app.use('/api', lionsRouter);
app.use('/api', tigersRouter);

app.listen(PORT, () => {
  console.log('server up on:' + PORT);
});
