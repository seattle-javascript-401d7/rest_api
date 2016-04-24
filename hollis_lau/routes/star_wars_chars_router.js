const Router = require("express").Router;
const bodyParser = require("body-parser").json();
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

var starWarsCharsRouter = module.exports = Router();

starWarsCharsRouter.post("/starwarschars", bodyParser, (req, res) => {
  var newStarWarsChar = new StarWarsChar(req.body);

  newStarWarsChar.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

starWarsCharsRouter.get("/starwarschars", (req, res) => {
  StarWarsChar.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});
