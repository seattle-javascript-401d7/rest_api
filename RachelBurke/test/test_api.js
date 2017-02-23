const chai = require('chai');
const expect = chai.expect;
const chaihttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/rb_db';

require(__dirname + '/../server.js');
const Wine = require(__dirname + '/../nodecellar/models/wines_model.js');
const Cheese = require(__dirname + '/../nodecellar/models/cheese_model.js');

// testing CRUD on wine method
describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a new wine', (done) => {
    request('localhost:' + port)
    .post('/api/wine')
    .send({ name: 'Fancy French Vineyard', year: '1800',
      country: 'France', grapes: 'Grenache / Syrah', description: 'Delicious' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Fancy French Vineyard');
      expect(res.body.year).to.eql('1800');
      expect(res.body.country).to.eql('France');
      expect(res.body.grapes).to.eql('Grenache / Syrah');
      expect(res.body.description).to.eql('Delicious');
      done();
    });
  });

  describe('GET method', () => {
    it('should get "/wine"', (done) => {
      request('localhost:' + port)
      .get('/api/wine')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body[0].name).to.eql('Fancy French Vineyard');
        expect(res.body[0].year).to.eql('1800');
        expect(res.body[0].country).to.eql('France');
        expect(res.body[0].grapes).to.eql('Grenache / Syrah');
        expect(res.body[0].description).to.eql('Delicious');
        done();
      });
    });
  });

  describe('routes that need wine in the DB: ', () => {
    beforeEach((done) => {
      var newWine = new Wine( { name: 'Fancy Spanish Vineyard', year: '2006',
         country: 'Spain', grapes: 'Tempranillo', description: 'Intoxicating' } );
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
      .send( { name: 'Fancy Wine', year: '2016',
        country: 'Australia', grapes: 'Malbec', description: 'young' } )
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('such good wine data with put');
        done();
      });
    });

    it('should turn water into wine or wine into water with a DELETE request', (done) => {
      request('localhost:' + port)
      .delete('/api/wine/' + this.wine._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Drank the wine!');
        done();
      });
    });
  });

  // testing CRUD on cheese method
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
        .send({ name: 'Gruyere', country: 'Switzerland', origin: 'Cow' })
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
        var newCheese = new Cheese({ name: 'Goat Cheese', country: 'All', origin: 'Goat' });
        newCheese.save((err, data) => {
          if (err) {
            console.log(err);
          }
          this.cheese = data;
          done();
        });
      });
      afterEach((done) => {
        this.cheese.remove((err) => {
          console.log(err);
          done();
        });
      });
      after((done) => {
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
        .send( { name: 'Parmesan', country: 'Italy', origin: 'Cows' } )
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

  // Test for pairingRouter
  describe('Wine and Cheese Pairings', () => {
    beforeEach((done) => {
      // add a cheese
      var newCheese = new Cheese({ name: 'Raclette', country: 'Switzerland', origin: 'Cow' });
      newCheese.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.cheese = data;
      });

      // add a wine
      var newWine = new Wine({ name: 'Fendant', year: '1999',
        country: 'Switzerland', grapes: 'test', description: 'Honeyed' });
      newWine.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.wine = data;
      });

      var newWines = new Wine( { name: 'Pinot Noir', year: '1988',
        country: 'France', grapes: 'test', description: 'dry' } );
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
});
