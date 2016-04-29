// require and instantiate express server
const express = require('express');
const app = express();
// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:localdb/');
// require the routers for the two resources
var teamsRouter = require(__dirname + '/../routes/team_routes');
var playersRouter = require(__dirname + '/../routes/player_routes');
var authRouter = require(__dirname + '/../routes/auth_routes');
// mount the routes onto api
app.use('/api', teamsRouter);
app.use('/api', playersRouter);
app.use('/api', authRouter);
// export the server launch codes
module.exports = exports = app.listen(3000, () => {
  process.stdout.write('surfs up on port 3000');
});
