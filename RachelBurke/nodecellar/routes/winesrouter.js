const Router = require('express').Router;
const Wine = require(__dirname + '/../models/wines_model');
const bodyParser = require('body-parser').json();
const errorhandler = require(__dirname + '/../lib/error_handler');
var winesRouter = module.exports = Router();

winesRouter.post('/wines', bodyParser, (req, res) => {
  var newWine = new Wine(req.body);
  newWine.save((err, data) => {
    if (err) return errorhandler(err, res);

    res.status(200).json(data);
  });
});

winesRouter.get('/wines', (req, res) => {
  Wine.find(null, (err, data) => {
    if (err) return errorhandler(err, res);

    res.status(200).json(data);
  });
});

winesRouter.put('/wines/:wine_id', (req, res) => {
  Wine.findById(req.params.wine_id, (err, wine) => {
    if (err) res.send(err);

    wine.quantity = req.body.quantity;
    wine.save((err) => {
      if (err) return res.send(err);

      res.json(wine);
    });
  });
});


winesRouter.delete('/wines/:wine_id', (req, res) => {
  Wine.findByIdAndRemove(req.params.wine_id, (err) => {
    if (err) return res.send(err);

    res.json({ message: 'Wine is all gone!' });
  });
});
