const Router = require('express').Router;
const Pants = require(__dirname + '/../models/pants');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/error_handler');

var pantsRouter = module.exports = Router();

pantsRouter.post('/pants', bodyParser, (req, res) => {
  var newPants = new Pants(req.body);
  newPants.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

pantsRouter.get('/pants', (req, res) => {
  Pants.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

pantsRouter.put('/pants/:id', bodyParser, (req, res) => {
  var pantsData = req.body;
  delete pantsData._id;
  Pants.update({_id: req.params.id}, pantsData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json('nice pants!');
  });
});

pantsRouter.delete('/pants/:id', (req, res) => {
  Pants.remove({_id: req.params.id}, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({msg: 'I didn\'t like those pants anyway.'});
  });
});
