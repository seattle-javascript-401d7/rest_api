const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/sharks_test_db';
const server = require(__dirname + '/../server');
const Shark = require(__dirname + '/../models/shark');
const User = require(__dirname + '/../models/privateModels/user');

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
  it('should create a shark', (done) => {
    request('localhost:' + port)
    .post('/api/sharks')
    .set({ 'token': this.newToken })
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
    request('localhost:' + port)
    .post('/api/signup')
    .send({ username: 'test', password: 'test' })
    .end((err, res) => {
      if (err) throw err;
      this.newToken = res.body.token;
      console.log(this.token);
      done();
    });
  });
  beforeEach((done) => {
    var newShark = new Shark({ name: 'testshark', preyPreference: 'tests' });
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

  it('should change the shark\'s identity on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/sharks/' + this.shark._id)
    .set({ 'token': this.newToken })
    .send({ name: 'Tiger shark', preyPreference: 'fish' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('update made!');
      done();
    });
  });

  it('should turn the shark into a nice rug on a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/sharks/' + this.shark._id)
    .set({ 'token': this.newToken })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('shark has been destroyed!');
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
