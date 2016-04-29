const Router = require('express').Router;
const Rabbit = require(__dirname + '/../../models/rabbit');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../../lib/errorHandler');
var rabbitRouter = module.exports = new Router();

rabbitRouter.post('/rabbit', bodyParser, (req, res) => {
  var newRabbit = new Rabbit(req.body);
  newRabbit.save((err) => {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({ msg: 'great job!' });
  });
});

rabbitRouter.get('/rabbit', (req, res) => {
  Rabbit.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    rabbitRouter.listen(200).json(data);
  });
});
