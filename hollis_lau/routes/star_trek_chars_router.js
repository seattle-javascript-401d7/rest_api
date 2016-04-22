const Router = require("express").Router;
const bodyParser = require("body-parser").json();
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

var starTrekCharRouter = module.exports = Router();

starTrekCharRouter.post("/startrekchars", bodyParser, (req, res) => {
  var newStarTrekChar = new StarTrekChar(req.body);

  newStarTrekChar.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

starTrekCharRouter.get("/startrekchars", (req, res) => {
  StarTrekChar.find(null, (err, data) => {
    if (err) return serverErrorHandler();

    res.status(200).json(data);
  });
});
