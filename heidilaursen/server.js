const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bearRouter = require(__dirname + '/routes/bearrouter');
const Bear = require(__dirname + '/models/bear');
const mongoose = require('mongoose');
//it's possible the error is in 'mongodb: //localhose/bear_test_db'
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/bear_db');

app.use('/api', bearRouter);

app.listen(PORT, () => {console.log('server up on ' + PORT)});
