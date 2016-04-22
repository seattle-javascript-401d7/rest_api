// const Router = require('express').Router;
// const Jedi = require(__dirname + '/../models/jedi');
// const Sith = require(__dirname + '/../models/sith');
// const mongoose = require('mongoose');
// const errorHandler = require(__dirname + '/../lib/errorHandler');
// var battleRouter = module.exports = Router();
//
// battleRouter.get('/battle', (req, res) =>
//
// });
//
//
// versusRouter.get('/versus', (req, res) => {
//   Jedi.find(null, (err, jediData) => {
//     if (err) return errorHandler(err, res);
//     Sith.find(null, (err, sithData) => {
//       if (err) return errorHandler(err, res);
//       res.status(200).json({
//         sith: sithData.length,
//         jedi: jediData.length
//       });
//     });
//   });
// });
