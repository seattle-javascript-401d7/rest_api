const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/wines_test_db';

require(__dirname + '/../server.js');
const Wine = require(__dirname + '/../models/wines_model.js');
const Cheese = require(__dirname + '/..models/cheese_model.js');

//testing CRUD on wine method
describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a new wine', (done) => {
    request('localhost:' + port)
    .post('/api/wines')
    .send({ name: 'Fancy French Vineyard', year: '1800', grapes: 'Grenache / Syrah',
      country: 'France', description: 'Delicious' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Fancy French Vineyard');
      expect(res.body.year).to.eql('1800');
      expect(res.body.grapes).to.eql('Grenache / Syrah');
      expect(res.body.country).to.eql('France');
      expect(res.body.description).to.eql('Delicious');
      done();
    });
  });

  describe('the GET method', () => {
    it('should get "/wines"', (done) => {
      request('localhost:' + port)
      .get('/api/wines')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Fancy Spanish Vineyard');
        expect(res.body.year).to.eql('2006');
        expect(res.body.grapes).to.eql('Tempranillo');
        expect(res.body.country).to.eql('Spain');
        expect(res.body.description).to.eql('Intoxicating');
        done();
      });
    });
  });

  describe('routes that need wine in the DB: ', () => {
    beforeEach((done) => {
      var newWine = Wine({name: 'Fancy Spanish Vineyard', year: '2006', grapes: 'Tempranillo', country: 'Spain', description: 'Intoxicating'});
      newWine.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.wine = data;
        done();
      });
    });
    afterEach((done) => {
      this.wine.remove((err) => {
        console.log(err);
        done();
      });
    });
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

  it('should change the wine\'s identity on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/wine/' + this.wine._id)
    .send({name: 'Fancy Wine', year: '2016', grapes: 'Malbec', country: 'Australia', description: 'young'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('such good wine data with put');
      done();
    });
  });

  it('should turn water into wine or wine into water with a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/wines/' + this.wine._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Deleted the wine!');
      done();
    });
  });
});

//testing CRUD on cheese method
describe('Cheese Router', () => {

  describe('POST method', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should create a new cheese', (done) => {
      request('localhost:' + port)
      .post('/api/cheese')
      .send({ name: 'Gruyere', country: 'Switzerland', source: 'Cow' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('From the cow.');
        done();
      });
    });
  });

  describe('GET method', () => {
    it('should taste good', (done) => {
      request('localhost:' + port)
      .get('/api/cheese')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.length).to.eql(0);
        done();
      });
    });
  });

  describe('routes that need cheese in the DB', () => {
    beforeEach((done) => {
      var newCheese = new Cheese({ name: 'Goat Cheese', country: 'All', source: 'Goat' })
      newCheese.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.cheese = data;
        done();
      });
    });
    afterEach((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should be from a goat', (done) => {
      request('localhost:' + port)
      .get('/api/cheese/goaty')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('This cheese is from a goat');
        done();
      });
    });

    it('should be able to PUT a cheese', (done) => {
      request('localhost:' + port)
      .put('/api/cheese/' + this.cheese._id)
      .send({ name: 'Parmesan', country: 'Italy', source: 'Cows'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('More cheese!');
        done();
      });
    });

    it('should be able to DELETE some cheese', (done) => {
      request('localhost:' + port)
      .delete('/api/cheese/' + this.cheese._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Enjoyed some cheese');
        done();
      });
    });
  });
});

//Test for pairingRouter
describe('Wine and Cheese Pairings', () => {
  beforeEach((done) => {
    //add a cheese
    var newCheese = new Cheese({ name: 'Raclette', country: 'Switzerland', source: 'Cow' });
    newCheese.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.cheese = data;
    });

    //add a wine
    var newWine = new Wine({ name: 'Fendant', year: '1999', country: 'Switzerland', description: 'Honeyed' });
    newWine.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    var newWines = new Wine({ name: 'Pinot Noir', year: '1988', country: 'France', description: 'dry'});
    newWines.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    done();
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should taste good in any scenario', (done) => {
    request('localhost:' + port)
    .get('/api/pairing')
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log(res.body);
      done();
    });
  });
});
