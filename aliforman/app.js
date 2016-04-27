'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/db');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

const jawaRouter = require(__dirname + '/routes/jawaRoutes');
const droidRouter = require(__dirname + '/routes/droidRoutes');
const addressRouter = require(__dirname + '/routes/query');

app.use('/api', jawaRouter);
app.use('/api', droidRouter);
app.use('/api', addressRouter);

app.listen(port, () => {
  console.log('Server listening on port ' + (port || 3000));
});
