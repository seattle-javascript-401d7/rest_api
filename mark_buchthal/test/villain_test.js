
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Villain = require(__dirname + '/../models/villain');

var port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/heroes_test_db';

require(__dirname + '/../server');

describe('POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a new villain', (done) => {
    request('localhost:' + port)
    .post('/api/villains')
    .send({ name:'Cheetah', dastardlyDoGooder:'Wonder Woman', powerLevel: 8, superPower:['she\'s a cat', 'has claws', 'meows']})
    .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Cheetah');
        expect(res.body.dastardlyDoGooder).to.eql('Wonder Woman');
        expect(res.body.powerLevel).to.eql(8);
        expect(res.body.superPower.length).to.eql(3);
        done();
    });
  });
});

describe('GET method', () => {
  it('should GET the villain data', (done) => {
    request('localhost:' + port)
    .get('/api/villains')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });
});

describe('routes that need an existing database', () => {

  beforeEach((done) => {
    var testHero = new Villain({name: 'testvillain', powerLevel: 0, superPower: ['testing'], dastardlyDoGooder: 'bugs'});
    testHero.save((err, data) => {
      this.villain = data;
      done();
    });
  });

  afterEach((done) => {
    this.villain.remove((err) => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should allow updates to villains with PUT', (done) => {
    request('localhost:' + port)
    .put('/api/villains/' + this.villain._id)
    .send({name:'changed', powerLevel:10, superPower:['changed'], archNemesis: 'changed'})
    .end((err, res) => {
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('updated');
      done();
    });
  });

  it('should allow villains to be deleted with DELETE', (done) => {
    request('localhost:' + port)
    .delete('/api/villains/' + this.villain._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('deleted');
      done();
    });
  });
});
