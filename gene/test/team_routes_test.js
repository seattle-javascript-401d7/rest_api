const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost:27017/';

const server = require(__dirname + '/../lib/server');

const Team = require(__dirname + '/../models/team');
const serverUrl = 'localhost:3000';

describe('The Team API', () => {
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
  it('should be able to GET all the teams', (done) => {
    request(serverUrl)
    .get('/api/teams')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('array');
      done();
    });
  });
  it('should be able to POST up a new team', (done) => {
    request(serverUrl)
    .post('/api/teams/')
    .send({ name: 'Bashers', city: 'Concussionville', mascot: 'Dinged Helmet', age: 99 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('Bashers');
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  describe('Tests that require a populated database', () => {
    beforeEach((done) => {
      Team.create({ name: 'test team' }, (err, data) => {
        if (err) throw err;
        this.testTeam = data;
        done();
      });
    });

    it('should be able to PUT up new info for a team', (done) => {
      request(serverUrl)
      .put('/api/teams/' + this.testTeam._id)
      .send({ name: 'Cows', city: 'Milk City', mascot: 'pig', age: 66 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('put good');
        done();
      });
    });

    it('should be able to DELETE a team', (done) => {
      request(serverUrl)
      .delete('/api/teams/' + this.testTeam._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
    });
  });
  });
