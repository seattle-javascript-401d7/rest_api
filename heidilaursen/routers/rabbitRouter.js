//this only calls the instance of router from express (nothing else)
const Router = require('express').Router;
const Rabbit = require(__dirname + '/../models/rabbit');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
var rabbitRouter = module.exports = new Router();

//resource bears that i'm accessing
bearRouter.post('/bears', bodyParser, (req, res) => {
  //parsed json
  // var bearData = req.body;
  var newRabbit = new Rabbit (req.body);
  //.save mongoose method
  newRabbit.save(function (err, data) {
    if (err) return serverErrorHandler(err, res);
    res.status(200).json({msg: 'great job!'});
  });
});

rabbitRouter.get('/rabbit', (req, res) => {
  Rabbit.find(null, (err, data) => {
    if(err) return serverErrorHandler(err, res);

    rabbitRouter.listen(200).json(data);
  });
});
