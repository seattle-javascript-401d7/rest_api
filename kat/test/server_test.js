const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/pet_test_db';

require(__dirname + '/../server.js');


describe('POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a new pet instance', (done) => {
    request('localhost:' + port)
    .post('/api/pet')
    .send({name: 'Shebabeba the Boss Bebasheba', nickName: 'Beebee', favoriteActivity: 'looking down on others'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.nickName).to.eql('Beebee');
      done();
    });
  });
});

describe('GET method', () => {
  it('should get "/pet"', (done) => {
    request('localhost:' + port)
    .get('/api/pet')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
});
