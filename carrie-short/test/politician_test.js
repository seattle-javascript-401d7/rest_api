const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const Politician = require(__dirname + '/../models/politician');
const User = require(__dirname + '/../models/user');
const port = process.env.PORT = 5000;
process.env.MONGODB_URI = 'mongodb://localhost/test_political_dinos_db';
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');

describe('Politician POST method', () => {
  before((done) => {
    setup(done);
  });
  after((done) => {
    teardown(done);
  });
  before((done) => {
    var newUser = new User({
      username: 'test',
      password: 'test'
    });
    newUser.save((err, user) => {
      if (err) console.log(err);
      user.generateToken((err, token) => {
        if (err) console.log(err);
        this.token = token;
        this.user = user;
        done();
      });
    });
  });
  it('should create a politician', (done) => {
    request('localhost:' + port)
      .post('/api/politicians')
      .set('token', this.token)
      .send({
        name: 'Cornelius Fudge',
        party: 'independent',
        debateSkills: '2',
        specialPower: 'magic'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Cornelius Fudge');
        expect(res.body.party).to.eql('independent');
        expect(res.body.debateSkills).to.eql('2');
        expect(res.body.specialPower).to.eql('magic');
        done();
      });
  });
});

describe('routes that need a politician in the DB', () => {
  before((done) => {
    setup(done);
  });
  beforeEach((done) => {
    var newPolitician = new Politician({
      name: 'test politician',
      party: 'evil',
      debateSkills: '4',
      specialPower: 'unit tests'
    });
    newPolitician.save((err, data) => {
      if (err) console.log(err);
      this.politician = data;
      done();
    });
  });
  afterEach((done) => {
    this.politician.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });
  before((done) => {
    var newUser = new User({
      username: 'test',
      password: 'test'
    });
    newUser.save((err, user) => {
      if (err) console.log(err);
      user.generateToken((err, token) => {
        if (err) console.log(err);
        this.token = token;
        this.user = user;
        done();
      });
    });
  });
  after((done) => {
    teardown(done);
  });
  it('should get all the politicians on a get request', (done) => {
    request('localhost:' + port)
    .get('/api/politicians')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(1);
      expect(res.body[0].name).to.eql('test politician');
      expect(res.body[0].party).to.eql('evil');
      expect(res.body[0].debateSkills).to.eql('4');
      expect(res.body[0].specialPower).to.eql('unit tests');
      done();
    });
  });
  it('should change the politician on PUT', (done) => {
    request('localhost:' + port)
    .put('/api/politicians/' + this.politician._id)
    .set('token', this.token)
    .send({
      name: 'Laura Roslin',
      party: 'religious',
      debateSkills: '8',
      specialPower: 'visions'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.nModified).to.eql(1);
      done();
    });
  });

  it('should remove the politician on DELETE', (done) => {
    request('localhost:' + port)
    .delete('/api/politicians/' + this.politician._id)
    .set('token', this.token)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('politician has retired from office');
      done();
    });
  });
});
