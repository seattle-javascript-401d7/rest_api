/* eslint-disable no-unused-expressions*/
'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 8080;
process.env.MONGODB_URI = 'mongodb://localhost/superhero_test_db';
const server = require(__dirname + '/../server');
const Superhero = require(__dirname + '/../app/models/superhero');
const Villain = require(__dirname + '/../app/models/villain');
const User = require(__dirname + '/../app/models/user');
process.env.APP_SECRET = 'secret';


describe('the heroes versus villains server', () => {
  before((done) => {
    let user = new User({ username: 'Phil', password: 234 });
    user.save((err, data) => {
      if (err) throw err;
      this.user = data;
      data.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should create a Superhero', (done) => {
    request('localhost:' + port)
    .post('/api/superheroes')
    .set('token', this.token)
    .send({ name: 'Captain America', powerlevel: 10000 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Captain America');
      expect(res.body.powerlevel).to.eql(10000);
      done();
    });
  });

  it('should create a Villain', (done) => {
    request('localhost:' + port)
    .post('/api/villains')
    .set('token', this.token)
    .send({ name: 'Ultron', powerlevel: 90000 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Ultron');
      expect(res.body.powerlevel).to.eql(90000);
      done();
    });
  });
  describe('the GET method', () => {
    it('should get all superheroes', (done) => {
      request('localhost:' + port)
      .get('/api/superheroes')
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
    it('should get all the villains', (done) => {
      request('localhost:' + port)
      .get('/api/villains')
      .set('token', this.token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });

  describe('GET method to retrieve strongest hero', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should get the strongest hero above 9000', (done) => {
      request('localhost:' + port)
      .get('/api/strongestCharacter')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.exist;
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });

  describe('how to manipulate superheroes or villains in db', () => {
    beforeEach((done) => {
      let newVillain = new Villain({ name: 'Ultron', powerlevel: 9000 });
      newVillain.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.villain = data;
        done();
      });
    });
    beforeEach((done) => {
      let newSuperhero = new Superhero({ name: 'Iron Man', powerlevel: 9999 });
      newSuperhero.save((err, data) => {
        if (err) {
          console.log(err);
        }
        this.superhero = data;
        done();
      });
    });

    afterEach((done) => {
      this.superhero.remove(() => {
        done();
      });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    after((done) => {
      server.close(() => {
        done();
      });
    });

    it('should update the existing Villain power level', (done) => {
      request('localhost:' + port)
      .put('/api/villains/' + this.villain._id)
      .send({ name: 'Ultron', powerlevel: 5 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('Successfully updated!');
        done();
      });
    });

    it('should update the existing Superhero power level', (done) => {
      request('localhost:' + port)
      .put('/api/superheroes/' + this.superhero._id)
      .send({ name: 'Iron Man', powerlevel: 200000 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('Successfully updated!');
        done();
      });
    });

    it('should be able to remove a superhero', (done) => {
      request('localhost:' + port)
      .delete('/api/superheroes/' + this.superhero._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('Successfully deleted!');
        done();
      });
    });

    it('should be able to remove a villain', (done) => {
      request('localhost:' + port)
      .delete('/api/superheroes/' + this.villain._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.message).to.eql('Successfully deleted!');
        done();
      });
    });
  });
});
