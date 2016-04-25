const Router = require("express").Router;
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const serverErrorHandler = require(__dirname + "/../lib/server_error_handler");

var battleRouter = module.exports = Router();

battleRouter.get("/battle", (req, res) => {

  StarTrekChar.find(null, (err, data) => {
    var starTrekChars;

    if (err) return serverErrorHandler(err, res);

    starTrekChars = data;
    StarWarsChar.find(null, (err, data) => {
      var starWarsChars;
      var starTrekChar;
      var starWarsChar;

      function randomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
      }

      function output(winner, loser) {
        res.status(200).json({
          winnerName: winner.name,
          winnerPower: winner.power,
          loserName: loser.name,
          loserPower: loser.power,
          winnerWeapon: winner.weapon,
          msg: winner.name + " defeats " + loser.name + " with a " + winner.weapon + "!"
        });
      }

      if (err) return serverErrorHandler(err, res);

      starWarsChars = data;

      if (!starTrekChars.length || !starWarsChars.length) {
        return res.status(200).json({
          msg: "Please add at least one Star Trek and Star Wars character!"
        });
      }

      starTrekChar = starTrekChars[randomIndex(starTrekChars)]._doc;
      starWarsChar = starWarsChars[randomIndex(starWarsChars)]._doc;

      if (starTrekChar.power > starWarsChar.power) {
        return output(starTrekChar, starWarsChar);
      }

      if (starWarsChar.power > starTrekChar.power) {
        return output(starWarsChar, starTrekChar);
      }

      res.status(200).json({
        starTrekName: starTrekChar.name,
        starTrekPower: starTrekChar.power,
        starWarsName: starWarsChar.name,
        starWarsPower: starWarsChar.power,
        msg: starTrekChar.name + " and " + starWarsChar.name + " battle to a draw!"
      });
    });
  });
});
