const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
var Mission = require(__dirname + '/../models/mission');

var PORT = process.env.PORT = 5150;
process.env.MONGO_URI = 'mongodb://localhost/pilot_mission_test_db';
require(__dirname + '/../server');

describe('testing the POST', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should start a new mission', (done) => {
      request('localhost:' + PORT)
      .post('/api/mission')
      .send({ missionName: 'Bomb WordPress', country: 'Iceland', base: 'Airbase' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.missionName).to.eql('Bomb WordPress');
        expect(res.body.country).to.eql('Iceland');
        expect(res.body.base).to.eql('Airbase');
        done();
      });
  });
});

describe('get the mission information', () => {
  it('should get the list of all the pilots', (done) => {
    request('localhost:' + PORT)
    .get('/api/mission')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('here is the PUT/Delete block', () => {
  beforeEach((done) => {
    var testMission = new Mission({ missionName: 'Trial Run', country: 'USA', base: 'Airbase' });
    testMission.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.mission = data;
      done();
    });
  });

  afterEach((done) => {
    this.mission.remove((err) => {
    if (err) {
      console.log(err);
    }
    done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should edit the mission', () => {
    request('localhost:' + PORT)
    .put('/api/mission/' + this.mission._id)
    .send({ misionName: 'UpdatedRun', country: 'Canada', base: 'Airbase' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('New Orders! You\'ve updated a mission!');
    });
  });

  it('should erase the mission', () => {
    request('localhost:' + PORT)
    .delete('/api/mission/' + this.mission._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Mission canceled');
    });
  });
});
