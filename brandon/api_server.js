if (!process.env.APP_SECRET) {
  throw new Error('You need to set the APP_SECRET environmental variable');
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const jediRouter = require(__dirname + '/routes/jediRouter');
const sithRouter = require(__dirname + '/routes/sithRouter');
const versusRouter = require(__dirname + '/routes/versusRouter');
const battleRouter = require(__dirname + '/routes/battleRouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jedi_sith_db');

 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   next();
 });

app.use('/api', jediRouter);
app.use('/api', sithRouter);
app.use('/api', versusRouter);
app.use('/api', battleRouter);
app.use((req, res) => {
  res.status(404).send('Bad route you have. 404 you have.');
});

module.exports = app.listen(PORT, () => console.log('server up on port:' + PORT));
