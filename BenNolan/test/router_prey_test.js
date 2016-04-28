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
describe('the POST methods', () => {
  before((done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'test', password: 'test' })
    .end((err, res) => {
      if (err) throw err;
      this.newToken = res.body.token;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should create a prey', (done) => {
    request('localhost:' + port)
    .post('/api/preys')
    .set({ 'token': this.newToken })
    .send({ name: 'seal', speed: '20' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('seal');
      expect(res.body.speed).to.eql('20');
      done();
    });
  });
});

describe('The Get method', () => {
  it('should get all the prey', (done) => {
    request('localhost:' + port)
    .get('/api/preys')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('routes that need prey in the DB', () => {
  beforeEach((done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'test', password: 'test' })
    .end((err, res) => {
      if (err) throw err;
      this.newToken = res.body.token;
      done();
    });
  });
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

  it('should change the prey\'s identity on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/preys/' + this.prey._id)
    .set({ 'token': this.newToken })
    .send({ name: 'seal', speed: '40' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('update made!');
      done();
    });
  });

  it('Should kill the human on a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/preys/' + this.prey._id)
    .set({ 'token': this.newToken })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('prey has been killed!');
      done();
    });
  });

  describe('server error', () => {
    it('should errr on a bad route', (done) => {
      request('localhost:' + port)
      .get('/badroute')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.text).to.eql('Error 404 File not found');
        done();
        });
      });
    });
  });
});
