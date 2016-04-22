const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/sharksprey_test_db';
require(__dirname + '/../server');
const Shark = require(__dirname + '/../models/shark');


describe('the POST methods', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should create a shark', (done) => {
    request('localhost:' + port)
    .post('/api/sharks')
    .send({ name: 'Sand Shark' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Sand Shark');
      expect(res.body.preyPreference).to.eql('fish');
      done();
    });
  });
});

describe('The Get method', () => {
  it('should get all the sharks', (done) => {
    request('localhost:' + port)
    .get('/api/sharks')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('routes that need a shark in the DB', () => {
  beforeEach((done) => {
    var newShark = new Shark({ name: 'testshark', preyPreference: 'tests' });
    newShark.save((err, data) => {
      this.shark = data;
      done();
    });
  });
  afterEach((done) => {
    this.shark.remove((err) => {
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should change the shark\'s indentity on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/sharks/' + this.shark_id)
    .send({ name: 'Tiger Shark', preyPreference: 'human' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('update made!');
      done();
    });
  });

  it('should kill the shark on a DELETE Request', (done) => {
    request('localhost:' + port)
    .delete('/api/sharks/' + this.shark_id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Shark has been destroyed');
      done();
    });
  });
});
