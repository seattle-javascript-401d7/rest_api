
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const heroRouter = require(__dirname + '/routes/herorouter');
const villainRouter = require(__dirname + '/routes/villainrouter');
const battleRouter = require(__dirname + '/routes/battlerouter');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/hero_db');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});

app.use('/api', heroRouter);
app.use('/api', villainRouter);
app.use('/api', battleRouter);
app.use((req, res) => {
  res.status(404).json({ 'msg': '404 - Save the cheerleader, Save the world' });
});
app.listen(PORT, () => console.log('server up on port: ' + PORT));

