const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:27017/';

const server = require(__dirname + '/../lib/server');

const Player = require(__dirname + '/../models/player');
const serverUrl = 'localhost:3000';

describe('The Player API', () => {
  // first launch the server
  before(() => {
    server.listen(3000);
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });
  it('should be able to GET all the players', (done) => {
    request(serverUrl)
    .get('/api/players')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('should be able to POST up a new player', (done) => {
    request(serverUrl)
    .post('/api/players/')
    .send({ name: 'Basher McGee', city: 'Concussionville', position: 'Running Back', age: 22 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('Basher McGee');
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  describe('Tests that require a populated database', () => {
    beforeEach((done) => {
      Player.create({ name: 'test player' }, (err, data) => {
        if (err) throw err;
        this.testPlayer = data;
        done();
      });
    });

    it('should be able to PUT up new info for a player', (done) => {
      request(serverUrl)
      .put('/api/players/' + this.testPlayer._id)
      .send({ name: 'Cowabunga Johnson', city: 'Milk City', position: 'Inverted', age: 33 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('put good');
        done();
      });
    });

    it('should be able to DELETE a player', (done) => {
      request(serverUrl)
      .delete('/api/players/' + this.testPlayer._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
    });
  });
  });
