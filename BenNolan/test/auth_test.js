const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/user_test_db';
const server = require(__dirname + '/../server');
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

  describe('the signup route', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
    it('should signup using a POST request', (done) => {
      request('localhost:' + port)
      .post('/api/signup')
      .send({ username: 'utest', password: 'ptest' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.token.length).to.not.eql(0);
        done();
      });
    });
  });

  describe('the signin route', () => {
    before((done) => {
      var newUser = new User({
        username: 'usertest',
        password: 'passtest'
      });
      newUser.generateHash(newUser.password);
      newUser.save((err, user) => {
        if (err) throw err;
        this.user = user;
        done();
      });
    });
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
    it('should accept a GET request when signed in', (done) => {
      request('localhost:' + port)
      .get('/api/signin')
      .auth('usertest', 'passtest')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.length).to.not.eql(0);
        done();
      });
    });
    it('should Error on a wrong username', (done) => {
      request('localhost:' + port)
      .get('/api/signin')
      .auth('badusername', 'passtest')
      .end((err, res) => {
        expect(err.toString()).to.eql('Error: Internal Server Error');
        expect(res).to.have.status(500);
        expect(res.body.msg).to.eql('user not found');
        done();
      });
    });
    it('should Error on a wrong password', (done) => {
      request('localhost:' + port)
      .get('/api/signin')
      .auth('usertest', 'badpass')
      .end((err, res) => {
        expect(err.toString()).to.eql('Error: Internal Server Error');
        expect(res).to.have.status(500);
        expect(res.body.msg).to.eql('wrong password');
        done();
      });
    });
  });
});
