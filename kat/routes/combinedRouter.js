const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const Pet = require(__dirname + '/../models/petModel.js');
const Sandwich = require(__dirname + '/../models/sandwichModel.js');
const errorHandler = require(__dirname + '/../lib/errorHandle.js');

var warsRouter = module.exports = new Router();

warsRouter.get('/sandwichvspet', (req, res) => {
  var petTotal = [];
  var sandwichTotal = [];

function findPet(done) {
    Pet.find(null, (err, data) => {
      if (err) return errorHandler(err, res);
      petTotal = data;
      done();
    });
  }

function findSandwich(done) {
  Sandwich.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    sandwichTotal = data;
    done();
  });

  findPet();
  findSandwich();
  if (petTotal > sandwichTotal) {
    console.log(petTotal);
    console.log(sandwichTotal);
    request('localhost:' + port)
      Sandwich.put('/api/sandwich/' + this.sandwich._id)
      .send({ name: 'Club', ingrediants: ['bacon', 'lettuce',
      'tomato', 'turkey', 'mayo'], yumFactor: 4 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated a sandwich');
        done();
      });
    });



  }
}
});
