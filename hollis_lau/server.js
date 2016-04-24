const express = require("express");
const app = express();
const mongoose = require("mongoose");
const starTrekCharsRouter = require(__dirname + "/routes/star_trek_chars_router");
const starWarsCharsRouter = require(__dirname + "/routes/star_wars_chars_router");

app.use("/api", starTrekCharsRouter);
app.use("/api", starWarsCharsRouter);

module.exports = function (port, cb) {
  cb = cb || (() => {});
  mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scifi");
  return app.listen(port, () => {
    process.stdout.write("Server up on port " + port + "\n");
    cb();
  });
};
