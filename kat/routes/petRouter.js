const Router = require('express').Router;
const Pet = require(__dirname + '/../models/petModel.js');
const bodyParser = require('body-parser').json();

var petRouter = module.exports = new Router();

petRouter.get('/pet', (req, res) => {
  Pet.find({}, (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ msg: 'Server Error' });
    }
    res.status(200).json(data);
  });
});

petRouter.post('/pet', bodyParser, (req, res) => {
  var newPet = new Pet(req.body);
  newPet.save((err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).json(data);
    }
    res.status(200).json(data);
  });
});
