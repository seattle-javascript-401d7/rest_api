const express = require("express");
const app = express();
const mongoose = require("mongoose");
const starTrekCharsRouter = require(__dirname + "/routes/star_trek_chars_router");
const starWarsCharsRouter = require(__dirname + "/routes/star_wars_chars_router");
const battleRouter = require(__dirname + "/routes/battle_router");
const authRouter = require(__dirname + "/routes/auth_router");

app.get("/", (req, res) => {
  res.status(200).json({ msg: "The Star Trek and Star Wars universes collide! Who will prevail?" });
});

app.use("/api", battleRouter);
app.use("/api", starTrekCharsRouter);
app.use("/api", starWarsCharsRouter);
app.use("/api", authRouter);
app.use("/", (req, res) => {
  res.status(404).json({ msg: "Lost in space! (404: Not Found)" });
});

module.exports = exports = function (port, mongoDbUri, cb) {
  mongoose.connect(mongoDbUri);
  return app.listen(port, cb);
};
