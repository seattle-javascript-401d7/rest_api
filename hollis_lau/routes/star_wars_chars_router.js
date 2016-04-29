const router = require("express").Router();
const bodyParser = require("body-parser").json();
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = exports = router;

router.post("/starwarschars", bodyParser, (req, res) => {
  var newStarWarsChar = new StarWarsChar(req.body);

  newStarWarsChar.save((err, data) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not create the Star Wars character!");
    }

    res.status(200).json(data);
  });
});

router.get("/starwarschars", (req, res) => {
  StarWarsChar.find(null, (err, data) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not retrieve the Star Wars character!");
    }

    res.status(200).json(data);
  });
});

router.put("/starwarschars/:id", bodyParser, (req, res) => {
  var starWarsCharData = req.body;

  delete starWarsCharData._id;

  StarWarsChar.update({ _id: req.params.id }, starWarsCharData, (err, raw) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not update the Star Wars character!");
    }

    res.status(200).json({ msg: "Star Wars character updated!", raw: raw });
  });
});

router.delete("/starwarschars/:id", (req, res) => {
  StarWarsChar.remove({ _id: req.params.id }, (err, product) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not delete the Star Wars character!");
    }

    res.status(200).json({ msg: "Star Wars character deleted!", product: product });
  });
});
