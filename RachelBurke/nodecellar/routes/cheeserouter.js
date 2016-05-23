const Router = require('express').Router;
const Cheese = require(__dirname + '/../models/cheese_model');
const bodyParser = require('body-parser').json();
const errorhandler = require(__dirname + '/../error_handler');

var cheeseRouter = module.exports = Router();

cheeseRouter.post('/cheese', bodyParser, (req, res) => {
  var newCheese = new Cheese(req.body);
  newCheese.save((err, data) => {
    if (err) return errorhandler(err, res);

    res.status(200).json(data);
  });
});

cheeseRouter.get('/cheese', (req, res) => {
  Cheese.find(null, (err, data) => {
    if (err) return errorhandler(err, res);

    res.status(200).json(data);
  });
});

cheeseRouter.put('/cheese/:cheese_id', (req, res) => {
  Cheese.findById(req.params.cheese_id, (err, cheese) => {
    if (err) return res.send(err);

    cheese.quantity = req.body.quantity;
    cheese.save((err, cheese) => {
      if (err) return res.send(err);

      res.json(cheese);
    });
  });
});


cheeseRouter.delete('/cheese/:cheese_id', (req, res) => {
  Cheese.findByIdAndRemove(req.params.wine_id, (err) => {
    if (err) return res.send(err);

    res.json({ message: 'Cheese is all gone!' });
  });
});
