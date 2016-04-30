const router = require("express").Router();
const bodyParser = require("body-parser").json();
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const jwtAuth = require(__dirname + "/../lib/jwt_auth");
const errorHandler = require(__dirname + "/../lib/error_handler");

module.exports = exports = router;

router.post("/starwarschars", jwtAuth, bodyParser, (req, res) => {
  var newStarWarsChar = new StarWarsChar(req.body);

  newStarWarsChar.save((err, data) => {
    if (err) {
      return errorHandler(err, res, 500, "Could not create the Star Wars character!");
    }

    res.status(200).json(data);
  });
});

router.get("/starwarschars", (req, res) => {
  StarWarsChar.find(null, (err, data) => {
    if (err) {
      return errorHandler(err, res, 500, "Could not retrieve the Star Wars character!");
    }

    res.status(200).json(data);
  });
});

router.put("/starwarschars/:id", jwtAuth, bodyParser, (req, res) => {
  var starWarsCharData = req.body;

  delete starWarsCharData._id;

  StarWarsChar.update({ _id: req.params.id }, starWarsCharData, (err, raw) => {
    if (err) {
      return errorHandler(err, res, 500, "Could not update the Star Wars character!");
    }

    res.status(200).json({ msg: "Star Wars character updated!", raw: raw });
  });
});

router.delete("/starwarschars/:id", jwtAuth, (req, res) => {
  StarWarsChar.remove({ _id: req.params.id }, (err, product) => {
    if (err) {
      return errorHandler(err, res, 500, "Could not delete the Star Wars character!");
    }

    res.status(200).json({ msg: "Star Wars character deleted!", product: product });
  });
});
