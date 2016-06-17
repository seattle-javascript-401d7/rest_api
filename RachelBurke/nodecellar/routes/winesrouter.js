const Router = require('express').Router;
const Wine = require(__dirname + '/../models/wines_model');
const bodyParser = require('body-parser').json();
const errorhandler = require(__dirname + '/../error_handler');
var winesRouter = module.exports = Router();

winesRouter.post('/wine', bodyParser, (req, res) => {
  var newWine = new Wine(req.body);
  newWine.save((err, data) => {
    if (err) return errorhandler(err, res);

    res.status(200).json(data);
  });
});

winesRouter.get('/wine', (req, res) => {
  Wine.find(null, (err, data) => {
    if (err) return errorhandler(err, res);

    res.status(200).json({ data });
  });
});

winesRouter.put('/wine/:id', bodyParser, (req, res) => {
  var wineData = req.body;
  delete wineData._id;
  Wine.update({ _id: req.params.id }, wineData, (err) => {
    if (err) return errorhandler(err, res);
    res.status(200).json({ msg: 'Wine updated' });
  });
});

winesRouter.delete('/wine/:wine_id', (req, res) => {
  Wine.findByIdAndRemove(req.params.wine_id, (err) => {
    if (err) return res.send(err);

    res.json({ message: 'Wine is all gone!' });
  });
});
