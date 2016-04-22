const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const mongoose = require('mongoose');
const request = chai.request;
const Shoes = require(__dirname + '/../models/shoes');
// the following order is important:
const port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/shoes_test_db';
require(__dirname + '/../lib/server');

describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should add a shoe', (done) => {
    request('localhost:' + port)
      .post('/api/shoes')
      .send({
        brand: 'Ranger Rick',
        type: 'Racoon',
        color: 'mustache-filtered-microbrews'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.brand).to.eql('Ranger Rick');
        expect(res.body.type).to.eql('Racoon');
        expect(res.body.color).to.eql('mustache-filtered-microbrews');
        done();
      });
  });
});

describe('the GET method', () => {
  it('should GET all the shoes', (done) => {
    request('localhost:' + port)
      .get('/api/shoes')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        expect(res.body.length).to.eql(0);
        done();
      });
  });
});

describe('routes that need to be a shoe in the DB', () => {
  beforeEach((done) => {
    var newShoe = new Shoes({
      brand: 'testshoe',
      type: 'testing',
      polish: 'polished'
    });
    newShoe.save((err, data) => {
      if (err) return;
      this.shoe = data;
      done();
    });
  });
  afterEach((done) => {
    this.shoe.remove((err) => {
      if (err) return;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should change the shoe\'s type on a PUT request', (done) => {
    request('localhost:' + port)
      .put('/api/shoes/' + this.shoe._id)
      .send({
        brand: 'sketchers',
        color: 'yellow'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('nice shoes!');
        done();
      });
  });
  it('should throw away the shoe with DELETE', (done) => {
    request('localhost:' + port)
      .delete('/api/shoes/' + this.shoe._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('those need to go to Goodwill.');
        done();
      });
  });
});
