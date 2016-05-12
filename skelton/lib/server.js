const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const shoesRouter = require(__dirname + '/../routes/shoes_router');
const pantsRouter = require(__dirname + '/../routes/pants_router');
const wardrobeRouter = require(__dirname + '/../routes/wardrobe_router');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/outfit_db');

app.use('/api', wardrobeRouter);
app.use('/api', shoesRouter);
app.use('/api', pantsRouter);
app.listen(PORT, () => console.log('your wardrobe advisor is waiting on PORT:' + PORT));
