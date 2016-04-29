if (!process.env.APP_SECRET) {
    throw new Error('You must set the app secret');
}

// const express = require('express');
// const app = express();
// const Authenticat = require('authenticat');
// const mongoose = require('mongoose');
// var connection = mongoose.createConnection(process.env.MONGOLAB_USERS_URI || 'mongodb://localhost/vinyl_db');
// var authenticat = new Authenticat(connection);
// const PORT = process.env.PORT || 3000;
//
// var mongoURI = process.env. MONGOLAB_DATA_URI || 'mongodb://localhost/thursday_db';
// mongoose.connect(mongoURI);
//
// app.use('/api', authenticat.router);
//
// const mugRouter = require(__dirname + '/routes/mug_router');
// const authRouter = require(__dirname + '/routes/auth_router');
// const vinylRouter = require(__dirname + '/routes/vinyl_router');
//
// app.use('/api', mugRouter);
// app.use('/api', vinylRouter);
// app.use('/api', authRouter);
//

var PORT = process.env.PORT || 3000;
var app = require(__dirname + '/_server.js');
app.listen(PORT, 'mongodb://localhost/thursday_db');


app.listen(PORT, () => console.log('server up on port:' + PORT));
