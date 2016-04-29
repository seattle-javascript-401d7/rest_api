const express = require('express');
const app = express();
const bandRouter = require(__dirname + '/routes/bandRoutes');
const songRouter = require(__dirname + '/routes/songRoutes');
const queryRouter = require(__dirname + '/routes/bandQuery');
const authRouter = require(__dirname + '/routes/auth_routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use('/api', bandRouter);
app.use('/api', songRouter);
app.use('/api', queryRouter);
app.use('/api', authRouter);

module.exports = exports = {
  server: { close: function() { throw new Error('server not started yet!') } }, // eslint-disable-line
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);
    return this.server = app.listen(port, cb);
  },
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
