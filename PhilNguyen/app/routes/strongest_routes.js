'use strict';
const Router = require('express').Router;
const Superhero = require(__dirname + '/../models/superhero');
const Villain = require(__dirname + '/../models/villain');

let strongestRouter = module.exports = Router();

strongestRouter.route('/strongestCharacter')

.get((req, res) => {
  let promiseOne = Superhero.find({ powerlevel: { $gt: 9000 } }).exec();
  let promiseTwo = Villain.find({ powerlevel: { $gt: 9000 } }).exec();

  Promise.all([promiseOne, promiseTwo]).then((combinedStrongest) => {
    console.log(combinedStrongest);
    res.json(combinedStrongest);
  })
  .catch((err) => {
    console.log(err);
  });
});
