const express = require('express');
const app = express();
const PORT = process.end.PORT || 3000;
const petRouter = require(__dirname + '/routes/petRouter.js');
const sandwichRouter = require(__dirname + '/routes/sandwichRouter.js');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/pet_db');
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/sandwich_db');

app.use('/api', petRouter);
app.listen(PORT, () => console.log('server alive at' + PORT));
