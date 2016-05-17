const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config');
const winesRouter = require(__dirname + '/nodecellar/routes/winesrouter');
const cheeseRouter = require(__dirname + '/nodecellar/routes/cheeserouter');
const authRouter = require(__dirname + '/nodecellar/routes/auth_router');
const pairingRouter = require(__dirname + '/nodecellar/routes/party');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rb_db');

const port = process.env.PORT || 3000;

app.set('superSecret', config.secret || 'changeme');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.use('/api', winesRouter);
app.use('/api', cheeseRouter);
app.use('/api', pairingRouter);
app.use('/api', authRouter);

app.listen(port);
console.log('Good things happen at http://localhost:' + port);
