const Router = require('express').Router;
const Politician = require(__dirname + '/../models/politician');
const bodyParser = require('body-parser').json();
const politiciansRouter = module.exports = new Router();

politiciansRouter.post('/politicians', bodyParser, (req, res) => {
  var newPolitician = new Politician(req.body);
  newPolitician.save((err, data) => {
    if (err) {
      return res.status(500).json({
        msg: 'dude, your server errored'
      });
    }
    res.status(200).json(data);
  });
});
