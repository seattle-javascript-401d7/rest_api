const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const User = require(__dirname + '/../models/user');
const port = process.env.PORT = 5000;
process.env.MONGODB_URI = 'mongodb://localhost/test_political_dinos_db';
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');

describe('User authentication signup', () => {
  before((done) => {
    setup(done);
  });
  after((done) => {
    teardown(done);
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
    setup(done);
  });
  after((done) => {
    teardown(done);
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
  it('should fail to signin on bad username', (done) => {
    request('localhost:' + port)
    .get('/api/signin')
    .auth('idonotexist', 'awesomesauce')
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res).to.have.status(500);
      expect(res.body.msg).to.eql('no such username found');
      done();
    });
  });
  it('should fail to signin on bad password', (done) => {
    request('localhost:' + port)
    .get('/api/signin')
    .auth('testSignin', 'iambadpass')
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Internal Server Error');
      expect(res).to.have.status(500);
      expect(res.body.msg).to.eql('incorrect password');
      done();
    });
  });
});
