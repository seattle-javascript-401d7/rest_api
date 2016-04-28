if (!process.env.APP_SECRET) throw new Error('You need to set the APP_SECRET environment variable');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bandRouter = require(__dirname + '/routes/bandRoutes');
const songRouter = require(__dirname + '/routes/songRoutes');
const queryRouter = require(__dirname + '/routes/bandQuery');
const authRouter = require(__dirname + '/routes/auth_routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/db');

app.use(bodyParser.json());
app.use('/api', bandRouter);
app.use('/api', songRouter);
app.use('/api', queryRouter);
app.use('/api', authRouter);

app.listen(PORT, () => console.log('Server listening on port:' + PORT));
