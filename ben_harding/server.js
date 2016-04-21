const express = require('express');

const app = express();
const PORT = process.env.PORT;
const bearsRouter = require(__dirname + '/routes/bears_router');
const slothsRouter = require(__dirname + '/routes/sloths_router');

require(__dirname + '/database');

app.use('/api', bearsRouter);
app.use('/api', slothsRouter);

app.listen(PORT, () => console.log('server up on port: ' + PORT));
