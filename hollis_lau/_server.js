const express = require("express");
const app = express();
const mongoose = require("mongoose");
const starTrekCharsRouter = require(__dirname + "/routes/star_trek_chars_router");
const starWarsCharsRouter = require(__dirname + "/routes/star_wars_chars_router");
const battleRouter = require(__dirname + "/routes/battle_router");
const authRouter = require(__dirname + "/routes/auth_router");
const errorHandler = require(__dirname + "/lib/error_handler");

app.get("/", (req, res) => {
  res.status(200).json({ msg: "The Star Trek and Star Wars universes collide! Who will prevail?" });
});

app.use("/api", battleRouter);
app.use("/api", starTrekCharsRouter);
app.use("/api", starWarsCharsRouter);
app.use("/api", authRouter);
app.use("/", (req, res) => {
  errorHandler(new Error("Lost in space! (404: Not Found)"), res, 404);
});

module.exports = exports = function (port, mongoDbUri, cb) {
  mongoose.connect(mongoDbUri);
  return app.listen(port, cb);
};
