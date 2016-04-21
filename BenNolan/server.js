const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sharkRouter = require(__dirname + '/routes/sharksrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/sharks_db');

app.use('/api', sharkRouter);
app.listen(PORT, () => console.log('server up on port:' + PORT));
