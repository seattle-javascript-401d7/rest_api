const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const Dinosaur = require(__dirname + '/../models/dinosaur');
const port = process.env.PORT = 5000;
process.env.MONGO_URI = 'mongodb://localhost/test_political_dinos_db';
require(__dirname + '/../server');

describe('Dinosaur POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should create a dinosaur', (done) => {
    request('localhost:' + port)
      .post('/api/dinosaurs')
      .send({
        name: 'Stabbasaurus',
        diet: 'children',
        attack: '4',
        specialPower: 'teeth knives'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Stabbasaurus');
        expect(res.body.diet).to.eql('children');
        expect(res.body.attack).to.eql('4');
        expect(res.body.specialPower).to.eql('teeth knives');
        done();
      });
  });
});

describe('routes that need a dinosaur in the DB', () => {
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
    this.dinosaur.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should get all the dinosaurs on a get request', (done) => {
    request('localhost:' + port)
    .get('/api/dinosaurs')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(1);
      expect(res.body[0].name).to.eql('test dinosaur');
      expect(res.body[0].diet).to.eql('carnivore');
      expect(res.body[0].attack).to.eql('8');
      expect(res.body[0].specialPower).to.eql('vestigial arms');
      done();
    });
  });
  it('should change the dinosaur on PUT', (done) => {
    request('localhost:' + port)
    .put('/api/dinosaurs/' + this.dinosaur._id)
    .send({
      name: 'Laura Roslin',
      party: 'religious',
      debateSkills: '8',
      attack: '5',
      specialPower: 'visions'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.nModified).to.eql(1);
      done();
    });
  });

  it('should remove the dinosaur on DELETE', (done) => {
    request('localhost:' + port)
    .delete('/api/dinosaurs/' + this.dinosaur._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('dinosaur has gone extinct');
      done();
    });
  });
});
