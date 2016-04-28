const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/wines_test_db';
require(__dirname + '/../server.js');
const Wine = require(__dirname + '/../models/wines_model.js');
const Cheese = require(__dirname + '/..models/cheese_model.js');


describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be good wine', (done) => {
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
    it('should get all the wines', (done) => {
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
      const newWine = Wine({name: 'Fancy Spanish Vineyard', year: '2006', grapes: 'Tempranillo', country: 'Spain', description: 'Intoxicating'});
      newWine.save((err, data) => {
        this.wine = data;
        done();
      });
    });

    afterEach((done) => {
      this.wine.remove((err) => {
        done();
      })
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

  it('should change the wine\'s identity on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/wines/' + this.wine._id)
    .send({name: 'Fancy Wine', year: '2016', grapes: 'Malbec', country: 'Australia', description: 'young'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('such good wine data');
      done();
    });
  });

  it('should turn water into wine or wine into water with a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/wines/' + this.bear._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('even better than the real thing');
      done();
    });
  });

});
