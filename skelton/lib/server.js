const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const shoesRouter = require(__dirname + '/../routes/shoes_router');
const pantsRouter = require(__dirname + '/../routes/pants_router');
const wardrobeRouter = require(__dirname + '/../routes/wardrobe_router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/outfit_db');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH');
  next();
});


app.use('/api', wardrobeRouter);
app.use('/api', shoesRouter);
app.use('/api', pantsRouter);
app.listen(PORT, () => console.log('your wardrobe advisor is waiting on PORT:' + PORT));
