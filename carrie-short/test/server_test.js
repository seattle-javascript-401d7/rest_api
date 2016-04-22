const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Politician = require(__dirname + '/../models/politician');
const port = process.env.PORT = 5000;
process.env.MONGO_URI = 'mongodb://localhost/test_political_bears_db';
require(__dirname + '/../server');

describe('Politician POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should create a politician', (done) => {
    request('localhost:' + port)
      .post('/api/politicians')
      .send({
        name: 'Cornelius Fudge',
        party: 'independent',
        debateSkills: '2',
        attack: '4',
        specialPower: 'magic'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Cornelius Fudge');
        expect(res.body.party).to.eql('independent');
        expect(res.body.debateSkills).to.eql('2');
        expect(res.body.attack).to.eql('4');
        expect(res.body.specialPower).to.eql('magic');
        done();
      });
  });
});

describe('routes that need a politician in the DB', () => {
  beforeEach((done) => {
    var newPolitician = new Politician({
      name: 'test politician',
      party: 'evil',
      debateSkills: '4',
      attack: '4',
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
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should get all the politicians on a get request', (done) => {
    request('localhost:' + port)
    .get('/api/politicians')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(1);
      expect(res.body[0].name).to.eql('test politician');
      expect(res.body[0].party).to.eql('evil');
      expect(res.body[0].debateSkills).to.eql('4');
      expect(res.body[0].attack).to.eql('4');
      expect(res.body[0].specialPower).to.eql('unit tests');
      done();
    });
  });

});
