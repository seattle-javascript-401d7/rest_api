
const Router = require('express').Router;
const Villain = require(__dirname + '/../models/villain');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');

var villainRouter = module.exports = exports = Router();

villainRouter.post('/villains', bodyParser, (req, res) => {
  var newVillain = new Villain(req.body);
  newVillain.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

villainRouter.get('/villains', (req, res) => {
  Villain.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

villainRouter.put('/villains/:id', bodyParser, (req, res) => {
  var villainData = req.body;
  delete villainData._id;
  Villain.findByIdAndUpdate({ _id: req.params.id }, villainData, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({ msg: 'updated' });
  });
});

villainRouter.delete('/villains/:id', (req, res) => {
  Villain.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({ msg: 'deleted' });
  });
});
