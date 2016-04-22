const Router = require('express').Router;
const Shark = require(__dirname + '/../models/shark');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var sharksRouter = module.exports = Router();

sharksRouter.post('/sharks', bodyParser, (req, res) => {
  var newShark = new Shark(req.body);
  newShark.save((err, data) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json(data);
  });
});

sharksRouter.get('/sharks', (req, res) => {
  Shark.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

sharksRouter.put('/sharks/:id', bodyParser, (req, res) => {
  var sharkData = req.body;
  delete sharkData._id;
  Shark.update({ _id: req.params.id }, sharkData, (err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'update made!' });
  });
});


sharksRouter.delete('/sharks/:id', (req, res) => {
  Shark.remove({ _id: req.params.id }, (err) => {
    if (err) serverErrorHandler(req, res);

    res.status(200).json({ msg: 'shark has been destroyed!' });
  });
});
