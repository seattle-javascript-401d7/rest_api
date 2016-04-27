const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;

process.env.MONGODB_URI = 'mongodb://localhost/bands_test_db';
require(__dirname + '/../server');
const Band = require(__dirname + '/../models/band');

describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should add a band', (done) => {
    request('localhost:' + port)
    .post('/api/bands')
    .send({ bandName: 'Husker Du', genre: 'Alternative' })
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log('added ' + res.body.bandName);
      expect(res.body.bandName).to.eql('Husker Du');
      expect(res.body.genre).to.eql('Alternative');
      done();
    });
  });
});

describe('the GET method', () => {
  it('should return an array of band names', (done) => {
    request('localhost:' + port)
    .get('/api/bands')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('routes to test PUT and DELETE: ', () => {

  beforeEach((done) => {
    var newBand = new Band({ bandName: 'testband', genre: 'testing' });
    newBand.save((err, data) => {
      if (err) return serverErrorHandler(err, data);
      this.band = data;
      done();
    });
  });

  afterEach((done) => {
    this.band.remove(() => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should change the band on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/bands/' + this.band._id)
    .send({ bandName: 'Marvin Gaye', genre: 'R&B' })
    .end((err, res) => {
      console.log(res.body.msg);
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('band edit complete');
      done();
    });
  });

  it('should remove band with a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/bands/' + this.band._id)
    .end((err, res) => {
      console.log(res.body.msg);
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('band delete complete');
      done();
    });
  });
});
