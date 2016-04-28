const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/prey_test_db';
const server = require(__dirname + '/../server');
const Prey = require(__dirname + '/../models/prey');
const Shark = require(__dirname + '/../models/shark');

describe('the server', () => {
  before((done) => {
    server.listen(port, () => {
      done();
    });
  });
  after((done) => {
    server.close(() => {
      done();
    });
  });
  describe('The GET request', () => {

  beforeEach((done) => {
    var newPrey = new Prey({ name: 'human', speed: '20' });
    newPrey.save((err, data) => {
      if (err) throw err;
      this.prey = data;
      done();
    });
  });
  afterEach((done) => {
    this.prey.remove((err) => {
      if (err) throw err;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  beforeEach((done) => {
    var newShark = new Shark({ name: 'human', speed: '20' });
    newShark.save((err, data) => {
      if (err) throw err;
      this.shark = data;
      done();
    });
  });
  afterEach((done) => {
    this.shark.remove((err) => {
      if (err) throw err;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should count all prey and sharks', (done) => {
    request('localhost:' + port)
    .get('/api/count')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.sharks).to.eql(1);
      expect(res.body.prey).to.eql(1);
      done();
      });
    });
  });
});
