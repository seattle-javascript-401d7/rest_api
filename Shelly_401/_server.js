const express = require('express');
const app = express();
const authRouter = require(__dirname + '/routes/auth_router');
const mugRouter = require(__dirname + '/routes/mug_router');
const vinylRouter = require(__dirname + '/routes/vinyl_router');
const mongoose = require('mongoose');


app.use('/api', authRouter);
app.use('/api', mugRouter);
app.use('/api', vinylRouter);
app.use('/*', (req, res) => {
    res.status(404).json({ msg: '404 not here' });
});

module.exports = exports = function(port, mongooseConnect, cb) {
mongoose.connect(mongooseConnect);
return app.listen(port, cb);
};
