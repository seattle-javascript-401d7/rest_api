'use strict';
const Router = require('express').Router;
const Superhero = require(__dirname + '/../models/superhero');
const Villain = require(__dirname + '/../models/villain');

let strongestRouter = module.exports = Router();

strongestRouter.route('/strongestCharacter')

.get((req, res) => {
  Superhero.find((err, superhero) => {
    if (err) {
      res.send(err);
    }
    let result = superhero.filter((hero) => {
      return hero.powerlevel >= 9000;
    });
    res.json(result);
  });
})
.get((req, res) => {
  Villain.find((err, villain) => {
    if (err) {
      res.send(err);
    }
    let result = villain.filter((villain) => {
      return villain.powerlevel >= 9000;
    });
    res.json(result);
  });
});
