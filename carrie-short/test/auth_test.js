const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const User = require(__dirname + '/../models/user');
const port = process.env.PORT = 5000;
process.env.MONGODB_URI = 'mongodb://localhost/test_political_dinos_db';
const server = require(__dirname + '/../server');

describe('User authentication signup', () => {
  before((done) => {
    server.listen(port, () => {
      console.log('server up on port ' + port);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(() => {
        console.log('server closes');
        done();
      });
    });
  });
  it('should generate a token on signup', (done) => {
    request('localhost:' + port)
    .post('/api/signup')
    .send({
      username: 'testAuth',
      password: 'passAuth'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.token.length).to.not.eql(0);
      done();
    });
  });
});

describe('User authentication signin', () => {
  before((done) => {
    server.listen(port, () => {
      console.log('server up on port ' + port);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close(() => {
        console.log('server closes');
        done();
      });
    });
  });
  before((done) => {
    var newUser = new User({
      username: 'testSignin',
      password: 'awesomesauce'
    });
    newUser.generateHash(newUser.password);
    newUser.save((err, user) => {
      if (err) console.log(err);
      this.user = user;
      done();
    });
  });
  it('should allow users to signin', (done) => {
    console.log('user info', this.user.username, this.user.password);
    request('localhost:' + port)
    .get('/api/signin')
    .auth('testSignin', 'awesomesauce')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.token.length).to.not.eql(0);
      done();
    });
  });
});
