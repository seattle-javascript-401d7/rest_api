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

starWarsCharsRouter.put("/starwarschars/:id", bodyParser, (req, res) => {
  var starWarsCharData = req.body;

  delete starWarsCharData._id;
  StarWarsChar.update({ _id: req.params.id }, starWarsCharData, (err, raw) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({ msg: "Star Wars character updated!", raw: raw });
  });
});

starWarsCharsRouter.delete("/starwarschars/:id", (req, res) => {
  StarWarsChar.remove({ _id: req.params.id }, (err, product) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({ msg: "Star Wars character deleted!", product: product });
  });
});
