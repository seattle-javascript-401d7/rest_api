const router = require("express").Router();
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = exports = router;

router.get("/battle", (req, res) => {
  function sendAddChars(name1, name2) {
    res.status(200).json({
      msg: "Please add at least one " + name1 + " and one " + name2 + " character!"
    });
  }

  function sendWinner(winner, loser) {
    res.status(200).json({
      winner: winner,
      loser: loser,
      msg: winner.name + " defeats " + loser.name + " with a " + winner.weapon + "!"
    });
  }

  function sendTie(char1, char2) {
    res.status(200).json({
      char1: char1,
      char2: char2,
      msg: char1.name + " and " + char2.name + " battle to a draw!"
    });
  }

  function getChars(model1, model2, cb) {
    model1.aggregate().sample(1).exec((err, char1) => {
      if (err) {
        return serverErrorHandler(err, res, "Could not retrieve a random character!");
      }

      cb(model2, char1);
    });
  }

  function battle(model2, char1) {
    model2.aggregate().sample(1).exec((err, char2) => {
      if (err) {
        return serverErrorHandler(err, res, "Could not retrieve a random character!");
      }

      if (!char1.length || !char2.length) {
        return sendAddChars("Star Trek", "Star Wars");
      }

      if (char1[0].power > char2[0].power) {
        return sendWinner(char1[0], char2[0]);
      }

      if (char1[0].power < char2[0].power) {
        return sendWinner(char2[0], char1[0]);
      }

      sendTie(char1[0], char2[0]);
    });
  }

  getChars(StarTrekChar, StarWarsChar, battle);
});
