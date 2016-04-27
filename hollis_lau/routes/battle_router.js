const router = require("express").Router();
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

module.exports = exports = router;

router.get("/battle", (req, res) => {
  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

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

  StarTrekChar.find(null, (err, data) => {
    var charCollections = [];
    var randomChars = [];

    if (err) return serverErrorHandler(err, res);

    charCollections[0] = data;

    StarWarsChar.find(null, (err, data) => {
      if (err) return serverErrorHandler(err, res);

      charCollections[1] = data;

      if (!charCollections[0].length || !charCollections[1].length) {
        return sendAddChars("Star Trek", "Star Wars");
      }

      randomChars[0] = charCollections[0][getRandomIndex(charCollections[0])]._doc;
      randomChars[1] = charCollections[1][getRandomIndex(charCollections[1])]._doc;

      if (randomChars[0].power > randomChars[1].power) {
        return sendWinner(randomChars[0], randomChars[1]);
      }

      if (randomChars[1].power > randomChars[0].power) {
        return sendWinner(randomChars[1], randomChars[0]);
      }

      sendTie(randomChars[0], randomChars[1]);
    });
  });
});
