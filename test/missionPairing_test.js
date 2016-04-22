const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
var Mission = require(__dirname + '/../models/mission');
var Pilot = require(__dirname + '/../models/pilot');


var PORT = process.env.PORT = 5150;
process.env.MONGO_URI = 'mongodb://localhost/pilot_mission_test_db';
require(__dirname + '/../server');

describe('here is the mission pairing block', () => {
  before((done) => {
    var testMission = new Mission({
      missionName: 'Trial Run',
      country: 'USA',
      base: 'Airbase'
    });
    testMission.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.mission = data;
    });
    var testPilot = new Pilot({
      name: 'Pierre Mitchelle',
      country: 'France',
      base: 'Aircraft Carrier'
    });
    testPilot.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.pilot = data;
    });
    done();
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should match evenly pilots and missions', () => {
    request('localhost:' + PORT)
    .get('/api/missionPairing')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.missionPairingMessage).to.eql('It\'s a Go! Send the planes out!');
    });
  });
});
