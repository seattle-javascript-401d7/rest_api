const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Sandwich = require(__dirname + '/../models/sandwichModel.js');
const errorHandler = require(__dirname + '/../lib/errorHandle.js');

var sandwichRouter = module.exports = new Router();


// NON-Crub endpoint

// possibilities, you could include the highest rated yumFactor for a sandwich
// or see if there are more pets than sandwiches, if yes then sandwiches
// print a list (array) of all of the ingrediants in every sandwich

sandwichRouter.get('/sandwich/tunamelt', (req, res) => {
  Sandwich.count({ type: 'Tuna Melt' }).count(function(err, count) {
    if(err) errorHandler(err, res);
    console.log('there is %d sandwich', count);
    res.status(200).send('There are ' + count + ' sandwiches');
  });
});
//
// sandwichRouter.get('/sandwich/mostyum', (req, res) => {
//   Sandwich.count('sandwiches', (sandwich) => {
//     sandwich.where('yumFactor').gte(5);
//     res.status(200).send(sandwich);
//   });
// });


// function findBear(callback) {
//   Bear.find(null, (err, data) => {
//     if (err) return handleErr(err, res);
//     allBears = data;
//     randomBear = allBears[Math.floor(Math.random() * allBears.length)];
//     callback(null);
//   });
// }
sandwichRouter.get('/sandwich/mostyum', (req, res) => {
  Sandwich.find({}, (err, data) => {
    if(err) errorHandler(err, res);

    res.status(200).json(data);
  });
});

// query.elemMatch('comment', function (elem) {
//   elem.where('author').equals('autobot');
//   elem.where('votes').gte(5);
// })
//
// query.where('comment').elemMatch({ author: 'autobot', votes: {$gte: 5}})


sandwichRouter.post('/sandwich', bodyParser, (req, res) => {
  var newSandwich = new Sandwich(req.body);
  newSandwich.save((err, data) => {
    if(err) errorHandler(err, res);
    res.status(200).json(data);
  });
});

sandwichRouter.get('/sandwich', (req, res) => {
  Sandwich.find(null, (err, data) => {
    if(err) errorHandler(err, res);
    res.status(200).json(data);
  });
});





sandwichRouter.put('/sandwich/:id', bodyParser, (req, res) => {
  var sandwichData = req.body;
  delete sandwichData._id;
  Sandwich.update({ _id: req.params.id }, sandwichData, (err) => {
    if(err) errorHandler(err, res);
    res.status(200).json({ msg: 'Updated a sandwich' });
  });
});

sandwichRouter.delete('/sandwich/:id', bodyParser, (req, res) => {
  Sandwich.remove({ _id: req.params.id }, (err) => {
    if(err) errorHandler(err, res);
    res.status(200).json({ msg: 'Ate a sandwich' });
  });
});
