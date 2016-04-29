/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

var port = process.env.PORT = 5555;
const app = require(__dirname + '/../server/_server');
var server;

var User = require(__dirname + '/../models/user');
process.env.APP_SECRET = 'testingSecret';

describe('the routes at /signUp and /signIn', () => {
  before( (done) => {
    server = app(port, process.env.MONGODB_URI || 'mongodb://localhost/user_testDB', () => {
      console.log('server up on ' + port);
      done();
    });
  });
  after( (done) => {
    mongoose.connection.db.dropDatabase( () => {
      mongoose.disconnect( () => {
      server.close( () => {
        done();
        });
      });
    });
  });
  it('should create a new user and generate a token for them on a POST request at /api/signUp', (done) => {
    request('localhost:' + port)
    .post('/api/signUp')
    .send({ username: 'testUser', password: 'newPassword' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      User.findOne({ username: 'testUser' }, (err, data) => {
        expect(err).to.eql(null);
        expect(data).to.not.eql(null);
        var token = data.generateToken();
          expect(res.body.token).to.eql(token);
          done();
        });
      });
    });
  it('should login a user and generate a token for them on a GET request at /api/signIn', (done) => {
    request('localhost:' + port)
    .get('/api/signIn')
    // .auth('testUser', 'newPassword')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.body.token).to.not.eql(null);
      done();
    });
  });
});
