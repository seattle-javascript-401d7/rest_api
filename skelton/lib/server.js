if (!process.env.APP_SECRET) throw new Error('you need to set the APP_SECRET environment variable');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const shoesRouter = require(__dirname + '/../routes/shoes_router');
const pantsRouter = require(__dirname + '/../routes/pants_router');
const wardrobeRouter = require(__dirname + '/../routes/wardrobe_router');
const authRouter = require(__dirname + '/../routes/auth_router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/outfit_db');

const fs = require('fs');

function checkDirectory(directory) {
  fs.stat(directory, (err) => {
    if (err) {
      fs.mkdir(directory);
      return console.log('made directory');
    }
    console.log('dir exists');
  });
}
checkDirectory('./data/');

app.use('/', authRouter);
app.use('/', wardrobeRouter);
app.use('/api', shoesRouter);
app.use('/api', pantsRouter);
app.listen(PORT, () => console.log('your wardrobe advisor is waiting on PORT:' + PORT));
