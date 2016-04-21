const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Router = require(__dirname + '/routes/router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/sharks_db');

app.use('/api', Router);
app.listen(PORT, () => console.log('server up on port:' + PORT));
