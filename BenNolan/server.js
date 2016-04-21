const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const whalesRouter = require(__dirname + '/routes/whalesrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/whales_test_db');

app.use('/api', whalesrouter);
app.listen(PORT, () => console.log('server up on port:' + PORT));
