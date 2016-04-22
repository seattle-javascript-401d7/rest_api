// require and instantiate express server
const express = require('express');
const app = express();
// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:3005/');
// require the routers for the two resources
const teamsRouter = require('__dirname + ./routes/teamsRouter');
const playersRouter = require('__dirname + ./routes/playersRouter');
// mount the routes onto api
app.use('/api', teamsRouter);
app.use('/api', playersRouter);
// export the server launch codes
module.exports =  exports = app.listen(3000, () => {
  process.stdout.write('surfs up on port 3000');
});
