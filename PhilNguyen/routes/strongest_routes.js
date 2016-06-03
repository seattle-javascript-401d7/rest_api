'use strict';
const Router = require('express').Router;
const Superhero = require(__dirname + '/../models/superhero');
const Villain = require(__dirname + '/../models/villain');
const jwToken = require(__dirname + '/../lib/jwt_auth');

let strongestRouter = module.exports = Router();

strongestRouter.route('/strongestCharacters')

.get(jwToken, (req, res) => {
  let promiseOne = Superhero.find({ powerlevel: { $gt: 9000 } }).limit(1).sort({ powerlevel: -1 }).exec();
  let promiseTwo = Villain.find({ powerlevel: { $gt: 9000 } }).limit(1).sort({ powerlevel: -1 }).exec();

  Promise.all([promiseOne, promiseTwo]).then((combinedStrongest) => {
    res.json(combinedStrongest);
  })
  .catch((err) => {
    console.log(err);
  });
});

strongestRouter.route('/strongestHero')
.get(jwToken, (req, res) => {
  let strongestHero = Superhero.find({ powerlevel: { $gt: 9000 } }).limit(1).sort({ powerlevel: -1 }).exec();

  strongestHero.then((hero) => {
    res.json(hero);
  })
  .catch((err) => {
    console.log(err);
  });
});

strongestRouter.route('/strongestVillain')
.get(jwToken, (req, res) => {
  let strongestVillain = Villain.find({ powerlevel: { $gt: 9000 } }).limit(1).sort({ powerlevel: -1 }).exec();

  strongestVillain.then((villain) => {
    res.json(villain);
  })
  .catch((err) => {
    console.log(err);
  });
});
