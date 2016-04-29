const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/kat_test_db';

var server = require(__dirname + '/../_server.js');
var Pet = require(__dirname + '/../models/petModel.js');
var Sandwich = require(__dirname + '/../models/sandwichModel.js');
var User = require(__dirname + '/../models/user.js');
process.env.APP_SECRET = 'moooooose';

describe('Total server', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/kat_test_db', done);
  });
  before((done) => {
    var user = new User({ username: 'test', password: 'test' });
    user.save((err, data) => {
      if (err) throw err;
      data.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
      server.close();
    });
  });

  it('should create a new pet instance', (done) => {
    request('localhost:' + port)
    .post('/api/pet')
    .set('token', this.token)
    .send({ name: 'Shebabeba the Boss Bebasheba', nickName: 'Beebee',
    favoriteActivity: 'looking down on others' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.nickName).to.eql('Beebee');
      done();
    });
  });

// describe('GET method', () => {
  it('should get "/pet"', (done) => {
    request('localhost:' + port)
    .get('/api/pet')
    .set('token', this.token)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

describe('Pet routes that need content to work', () => {
  beforeEach((done) => {
    var newPet = new Pet({ name: 'TestCat', nickName: 'muffin', favoriteActivity: 'feather tag' });
    newPet.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.pet = data;
      done();
    });
  });
  afterEach((done) => {
    this.pet.remove((err) => {
      console.log(err);
      done();
    });
  });

  it('should be able to PUT a pet', (done) => {
    request('localhost:' + port)
    .put('/api/pet/' + this.pet._id)
    .send({ name: 'Noodle', nickName: 'Nunu', favoriteActivity: 'hissing' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Updated a pet entry with put');
      done();
    });
  });

  it('should be able to DELETE a pet entry', (done) => {
    request('localhost:' + port)
    .delete('/api/pet/' + this.pet._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Deleted a pet entry');
      done();
    });
  });

    it('should create a new sandwich instance', (done) => {
      request('localhost:' + port)
      .post('/api/sandwich')
      .set('token', this.token)
      .send({ name: 'Grilled Cheese', ingrediants: ['bread', 'cheese'], yumFactor: 2 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.yumFactor).to.eql(2);
        done();
      });
    });

    it('should get me a sandwich', (done) => {
      request('localhost:' + port)
      .get('/api/sandwich')
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(1);
        done();
      });
    });
});
  describe('Sandwich Routes that need content to work', () => {

    beforeEach((done) => {
      var newSandwich = new Sandwich({ name: 'Testwich',
      ingrediants: ['test', 'bread'], yumFactor: 9 });
      newSandwich.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.sandwich = data;
        done();
      });
    });
    afterEach((done) => {
      this.sandwich.remove((err) => {
        console.log(err);
        done();
      });
    });

    it('should be return yumFActor above 5', (done) => {
      request('localhost:' + port)
      .get('/api/sandwich/mostyum')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('There are 1 sandwiches with a yumFactor above a 5/10');
        done();
      });
    });

    it('should be able to PUT a sandwich', (done) => {
      request('localhost:' + port)
      .put('/api/sandwich/' + this.sandwich._id)
      .send({ name: 'Club', ingrediants: ['bacon', 'lettuce',
      'tomato', 'turkey', 'mayo'], yumFactor: 4 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Updated a sandwich');
        done();
      });
    });

    it('should be able to DELETE (eat) a sandwich', (done) => {
      request('localhost:' + port)
      .delete('/api/sandwich/' + this.sandwich._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Ate a sandwich');
        done();
      });
    });
  });

// Test for combinedRouter
describe('War of pets and sandwiches', () => {
  beforeEach((done) => {
    // add one sandwich
    var newSandwich = new Sandwich({ name: 'Testwich',
    ingrediants: ['test', 'bread'], yumFactor: 9 });
    newSandwich.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.sandwich = data;
    });

    // two pets
    var newPet = new Pet({ name: 'TestCat', nickName: 'muffin', favoriteActivity: 'feather tag' });
    newPet.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    var newPet2 = new Pet({ name: 'TestCat2', nickName: 'muffin2' });
    newPet2.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    done();
  });

  it('should have a yumfactor of zero', (done) => {
    request('localhost:' + port)
      .get('/api/war')
      .end((err, res) => {
        expect(err).to.eql(null);
        done();
      });
  });
});

});
