const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const rabbitRouter = require(__dirname + '/routers/rabbitRouter');
const slugRouter = require(__dirname + '/routers/slugRouter');
const authRouter = require(__dirname + '/routers/authRouter');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/slug_rabbit_db');

app.use('/api', rabbitRouter);
app.use('/api', slugRouter);
app.use('/api', authRouter);

app.listen(PORT, () => {console.log('server up on ' + PORT);});
