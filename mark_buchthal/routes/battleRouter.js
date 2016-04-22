
const Router = require('express').Router;
const Hero = require(__dirname + '/../models/hero');
const Villain = require(__dirname + '/../models/villain');
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const mongoose = require('mongoose');
var battleRouter = module.exports = exports = Router();

battleRouter.get('/battle', (req, res) => {
  var randHero, randVillain, heroLevel, villainLevel, heroPower, villainPower;

   // get random hero and villain from collections
  getHeroes();

  // get powerLevel from both items retrieved

  // get random power from winning hero

  // generate text

});

function getHeroes() {

  // var randNum = Math.floor(Math.random() * randHero[0].superPower.length)
  Hero.aggregate({$sample:{size:1}}, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    randHero = data;
    var randNum = Math.floor(Math.random() * randHero[0]['superPower'].length);
    heroPower = randHero[0]['superPower'][randNum];
    heroLevel = randHero[0]['powerLevel'];
    console.log(heroPower);
  });
  Villain.aggregate({$sample:{size:1}}, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    randVillain = data;
    var randNum = Math.floor(Math.random() * randHero[0]['superPower'].length);
    villainPower = randVillain[0]['superPower'][randNum];
    villainLevel = randVillain[0]['powerLevel'];
    console.log(villainPower);
  });
}
