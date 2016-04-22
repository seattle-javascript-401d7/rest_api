'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 8080;
require(__dirname + '/../server');
const Superhero = require(__dirname + '/../app/models/superhero');


describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should create a Superhero', (done) => {
    request('localhost:' + port)
    .post('/heroes/superhero')
    .send({ name: 'Captain America', powerlevel: 10000 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Captain America');
      expect(res.body.powerlevel).to.eql(10000);
      done();
    });
  });
});

describe('the GET method', () => {
  it('should get all superheroes', (done) => {
    request('localhost:' + port)
    .get('/heroes/superhero')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('how to manipulate superheroes or villains in db', () => {
  beforeEach((done) => {
    let newSuperhero = new Superhero({ name: 'Iron Man', powerlevel: 9999 });
    newSuperhero.save((err, data) => {
      this.superhero = data;
      done();
    });
  });

  afterEach((done) => {
    this.superhero.remove((err) => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should update the existing Superhero power level', (done) => {
    request('localhost:' + port)
    .put('/heroes/superhero/' + this.superhero._id)
    .send({ name: 'Iron Man', powerlevel: 200000 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.message).to.eql('Successfully updated!');
      done();
    });
  });

  it('should be able to remove a superhero', (done) => {
    request('localhost:' + port)
    .delete('/heroes/superhero/' + this.superhero._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.message).to.eql('Successfully deleted!');
      done();
    });
  });

});
