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
        return res.status(200).json({
          winner: starTrekChar.name,
          loser: starWarsChar.name,
          weapon: starTrekChar.weapon,
          msg: starTrekChar.name + " defeats " + starWarsChar.name + " with a " +
               starTrekChar.weapon + "!"
        });
      }

      if (starWarsChar.power > starTrekChar.power) {
        return res.status(200).json({
          winner: starWarsChar.name,
          loser: starTrekChar.name,
          weapon: starWarsChar.weapon,
          msg: starWarsChar.name + " defeats " + starTrekChar.name + " with a " +
               starWarsChar.weapon + "!"
        });
      }
    });
  });
});
