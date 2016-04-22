const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const jediRouter = require(__dirname + '/routes/jediRouter');
const sithRouter = require(__dirname + '/routes/sithRouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jedi_sith_db');

app.use('/api', jediRouter);
app.use('/api', sithRouter);
app.listen(PORT, () => console.log('server up on port:' + PORT));
