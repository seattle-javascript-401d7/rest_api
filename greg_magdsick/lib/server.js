const app = require('express')();
const router = require(__dirname + '/routes/router');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_LOC || 'mongodb://localhost/db');

app.use('/api', router);

app.listen(PORT, () => process.stdout.write('server lisening on: ' + PORT + '\n'));
