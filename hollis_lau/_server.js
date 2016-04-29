const express = require("express");
const app = express();
const mongoose = require("mongoose");
const starTrekCharsRouter = require(__dirname + "/routes/star_trek_chars_router");
const starWarsCharsRouter = require(__dirname + "/routes/star_wars_chars_router");
const battleRouter = require(__dirname + "/routes/battle_router");
const authRouter = require(__dirname + "/routes/auth_router");

app.use("/api", starTrekCharsRouter);
app.use("/api", starWarsCharsRouter);
app.use("/api", battleRouter);
app.use("/api", authRouter);

module.exports = exports = function (port, mongoDbUri, cb) {
  mongoose.connect(mongoDbUri);
  return app.listen(port, cb);
};
