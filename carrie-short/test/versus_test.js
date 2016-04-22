const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Dinosaur = require(__dirname + '/../models/dinosaur');
const Politician = require(__dirname + '/../models/politician');
const port = process.env.PORT = 5000;
process.env.MONGO_URI = 'mongodb://localhost/test_political_dinos_db';
const server = require(__dirname + '/../server');

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
  beforeEach((done) => {
    var newDinosaur = new Dinosaur({
      name: 'test dinosaur',
      diet: 'carnivore',
      attack: '8',
      specialPower: 'vestigial arms'
    });
    newDinosaur.save((err, data) => {
      if (err) console.log(err);
      this.dinosaur = data;
      done();
    });
  });
  afterEach((done) => {
    this.politician.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });
  afterEach((done) => {
    this.dinosaur.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });
  before((done) => {
    server.listen(port, () => {
      console.log('server up on port ' + port);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
    server.close();
  });
  it('should count all the politicians and dinosaurs on a get request to /versus', (done) => {
    request('localhost:' + port)
    .get('/api/versus')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.politicians).to.eql(1);
      expect(res.body.dinosaurs).to.eql(1);
      done();
    });
  });
});
