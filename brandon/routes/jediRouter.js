const Router = require('express').Router;
const Jedi = require(__dirname + '/../models/jedi');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + '/../lib/errorHandler');
var jediRouter = module.exports = Router();

jediRouter.post('/jedi', bodyParser, (req, res) => {
  var newJedi = new Jedi(req.body);
  newJedi.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

jediRouter.get('/jedi', (req, res) => {
  Jedi.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

jediRouter.put('/jedi/:id', bodyParser, (req, res) => {
  var jediData = req.body;
  delete jediData._id;
  Jedi.update({ _id: req.params.id }, jediData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'New Information, we have. Mmmm?' });
  });
});

jediRouter.delete('/jedi/:id', (req, res) => {
  Jedi.remove({ _id: req.params.id }, (err) => {
    if (err) errorHandler(req, res);
    res.status(200).json({ msg: 'I have felt a tremor in the force. The Dark Side calls' });
  });
});
