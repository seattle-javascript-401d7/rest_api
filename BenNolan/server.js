const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sharkRouter = require(__dirname + '/routes/sharksrouter');
const preyRouter = require(__dirname + '/routes/preyrouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sharksprey_db');

app.use('/api', sharkRouter);
app.use('/api', preyRouter);
app.listen(PORT, () => console.log('server up on port:' + PORT));
