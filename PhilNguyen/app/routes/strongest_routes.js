'use strict';
const Router = require('express').Router;
const Superhero = require(__dirname + '/../models/superhero');

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
;
