const router = require("express").Router();
const bodyParser = require("body-parser").json();
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = exports = router;

router.post("/startrekchars", bodyParser, (req, res) => {
  var newStarTrekChar = new StarTrekChar(req.body);

  newStarTrekChar.save((err, data) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not create the Star Trek character!");
    }

    res.status(200).json(data);
  });
});

router.get("/startrekchars", (req, res) => {
  StarTrekChar.find(null, (err, data) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not retrieve the Star Trek character!");
    }

    res.status(200).json(data);
  });
});

router.put("/startrekchars/:id", bodyParser, (req, res) => {
  var starTrekCharData = req.body;

  delete starTrekCharData._id;

  StarTrekChar.update({ _id: req.params.id }, starTrekCharData, (err, raw) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not update the Star Trek character!");
    }

    res.status(200).json({ msg: "Star Trek character updated!", raw: raw });
  });
});

router.delete("/startrekchars/:id", (req, res) => {
  StarTrekChar.remove({ _id: req.params.id }, (err, product) => {
    if (err) {
      return serverErrorHandler(err, res, "Could not delete the Star Trek character!");
    }

    res.status(200).json({ msg: "Star Trek character deleted!", product: product });
  });
});
