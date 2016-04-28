const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const User = require(__dirname + '/../models/user');
const Dinosaur = require(__dirname + '/../models/dinosaur');
const port = process.env.PORT = 5000;
process.env.MONGODB_URI = 'mongodb://localhost/test_political_dinos_db';
const server = require(__dirname + '/../server');

describe('Dinosaur POST method', () => {
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
  it('should create a dinosaur', (done) => {
    request('localhost:' + port)
      .post('/api/dinosaurs')
      .set('token', this.token)
      .send({
        name: 'Stabbasaurus',
        diet: 'children',
        attack: '4',
        specialPower: 'teeth knives'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Stabbasaurus');
        expect(res.body.diet).to.eql('children');
        expect(res.body.attack).to.eql('4');
        expect(res.body.specialPower).to.eql('teeth knives');
        done();
      });
  });
});

describe('routes that need a dinosaur in the DB', () => {
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
  beforeEach((done) => {
    var newDinosaur = new Dinosaur({
      name: 'test dinosaur',
      diet: 'carnivore',
      attack: '8',
      specialPower: 'vestigial arms',
      userID: this.user._id
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
      server.close(() => {
        console.log('server closes');
        done();
      });
    });
  });
  it('should get all the dinosaurs on a get request', (done) => {
    request('localhost:' + port)
    .get('/api/dinosaurs')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
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
    .set('token', this.token)
    .send({
      name: 'Laura Roslin',
      party: 'religious',
      debateSkills: '8',
      attack: '5',
      specialPower: 'visions'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.nModified).to.eql(1);
      done();
    });
  });

  it('should remove the dinosaur on DELETE', (done) => {
    request('localhost:' + port)
    .delete('/api/dinosaurs/' + this.dinosaur._id)
    .set('token', this.token)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('dinosaur has gone extinct');
      done();
    });
  });
});
