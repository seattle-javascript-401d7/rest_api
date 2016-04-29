const express = require('express');
const app = express();
const petRouter = require(__dirname + '/routes/petRouter.js');
const sandwichRouter = require(__dirname + '/routes/sandwichRouter.js');
const warsRouter = require(__dirname + '/routes/combinedRouter.js');
const authRouter = require(__dirname + '/routes/authRouter.js');
const mongoose = require('mongoose');

app.use('/api', petRouter);
app.use('/api', sandwichRouter);
app.use('/api', warsRouter);
app.use('/api', authRouter);
module.exports = exports = {
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);
    return app.listen(port, cb);
  }
};
