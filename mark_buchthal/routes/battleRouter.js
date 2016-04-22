
const Router = require('express').Router;
const Hero = require(__dirname + '/../models/hero');
const Villain = require(__dirname + '/../models/villain');
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const mongoose = require('mongoose');
var battleRouter = module.exports = exports = Router();
var heroLevel, villainLevel, villainPower, heroPower, heroName, villainName;
var counter = 0;

battleRouter.get('/battle', (req, res) => {
  getHero((herodata) => {
    var heroRandNum = Math.floor(Math.random() * randHero[0]['superPower'].length);
    heroName = randHero[0]['name'];
    heroPower = randHero[0]['superPower'][heroRandNum];
    heroLevel = randHero[0]['powerLevel'];
    getVillain((villaindata) => {
      var villainRandNum = Math.floor(Math.random() * randHero[0]['superPower'].length);
      villainName = randVillain[0]['name'];
      villainPower = randVillain[0]['superPower'][villainRandNum];
      villainLevel = randVillain[0]['powerLevel'];
      sendMessage(res);
    });
  });
});

function getHero(cb) {
  Hero.aggregate({$sample:{size:1}}, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    randHero = data;
    cb(randHero);
  });
}

function getVillain(cb) {
  Villain.aggregate({$sample:{size:1}}, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    randVillain = data;
    cb(randVillain);
  });
}

function sendMessage(res) {
  if (heroLevel > villainLevel) {
    res.status(200).send('The ' + heroPower + ' of ' + heroName + ' has defeated ' + villainName + ' and their ' + villainPower +'!!');
  } else {
    res.status(200).send('The ' + villainPower + ' of ' + villainName + ' has defeated ' + heroName + ' and their ' + heroPower +'!!');
  }
}
