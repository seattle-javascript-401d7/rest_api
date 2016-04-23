const chai = require('chai');
const expect = chai.expect();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
//use different port than database
var port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mondodb://localhost/rabbit_test_db';
require(__dirname + '/../server');

describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should build a rabbit', (done) => {
    request('localhost:' + port)
    .post('/api/rabbit')
    .send({name: 'Randall', variety: 'holland lop', food: 'celery'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eq.('Randall');
      expect(res.body.variety).to.eql('holland lop');
      expect(res.body.food).to.eql(celery);
      done();
    });
  });
});

describe('the GET method', () => {
  it('should get all the rabbits', (done) => {
    request('localhost:' + port)
    .get('/api/rabbit')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
    })
  });
});
