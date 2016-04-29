const app = require('express')();

const pedal = require(__dirname + '/../routes/pedal');
const motor = require(__dirname + '/../routes/motor');
const fast = require(__dirname + '/../routes/fast');
const auth = require(__dirname + '/../routes/auth');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_LOC || 'mongodb://localhost/db');

app.use('/api', pedal);
app.use('/api', motor);
app.use('/api', fast);
app.use('/api', auth);

module.exports = exports = app.listen(PORT, () => {
  process.stdout.write('server lisening on: ' + PORT + '\n');
});
