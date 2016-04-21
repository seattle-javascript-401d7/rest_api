const Router = require('express').Router;
const Bear = require(__dirname + '/../models/bear');
const bodyParser = require('body-parser').json();
const bearsRouter = module.exports = new Router();

bearsRouter.post('/bears', bodyParser, (req, res) => {
  var newBear = new Bear(req.body);
  newBear.save((err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    res.status(200).json(data);
  });
});
