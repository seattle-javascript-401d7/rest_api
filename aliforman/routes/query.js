'use strict';

const Router = require('express').Router;
const Droid = require('../models/droid');
const Jawa = require('../models/jawa');
const serverErrHandler = require(__dirname + '/../lib/serverErrHandler');

var addressRouter = module.exports = Router();
addressRouter.get('/address/:addressQuery', (req, res) => {
  console.log('address GET route worked!');
  console.log(req.params);
  var findAddress = req.params.addressQuery;
  var droidCount = 0;
  var jawaCount = 0;
  var addressResults = [];

  Droid.find({ address: findAddress }, (err, data) => {
    if (err) return serverErrHandler(err, res);
    data.forEach((droid) => {
      droidCount += 1;
      addressResults.push(droid.name);
    });
  });

  Jawa.find({ address: findAddress }, (err, data) => {
    if (err) return serverErrHandler(err, res);
    data.forEach((jawa) => {
      jawaCount += 1;
      addressResults.push(jawa.name);
    });
    res.json(addressResults);
  });
});
