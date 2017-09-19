const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const jawaRouter = require(__dirname + '/routes/jawaRoutes');
const droidRouter = require(__dirname + '/routes/droidRoutes');
const addressRouter = require(__dirname + '/routes/query');
const authRouter = require(__dirname + '/routes/authRoutes');

app.use('/api', jawaRouter);
app.use('/api', droidRouter);
app.use('/api', authRouter);
app.use('/api', addressRouter);

module.exports = exports = {
  server: { close: function() {
    throw new Error('server not started yet!');
  }
},
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);
    return this.server = app.listen(port, cb);
  },
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
