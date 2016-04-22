const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
var Pilot = require(__dirname + '/../models/pilot');


var PORT = process.env.PORT = 5150;
process.env.MONGO_URI = 'mongodb://localhost/pilot_mission_test_db';
require(__dirname + '/../server');

describe('testing the POST', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should recruit a new pilot', (done) => {
      request('localhost:' + PORT)
      .post('/api/pilot')
      .send({ name: 'James N', callSign: 'jimmynono', jet: 'F-18', favoriteSong: 'Danger Zone' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('James N');
        expect(res.body.callSign).to.eql('jimmynono');
        expect(res.body.jet).to.eql('F-18');
        done();
      });
  });
});

describe('get the pilot roster', () => {
  it('should get the list of all the pilots', (done) => {
    request('localhost:' + PORT)
    .get('/api/pilot')
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
    var testPilot = new Pilot({ name: 'Pierre Mitchelle', country: 'France', base: 'Aircraft Carrier' });
    testPilot.save((err, data) => {
      if (err) {
        console.log(err);
      }
      this.pilot = data;
      done();
    });
  });

  afterEach((done) => {
    this.pilot.remove((err) => {
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

  it('should edit the pilot', () => {
    request('localhost:' + PORT)
    .put('/api/pilot/' + this.pilot._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Pilot updated...time for a new mission');
    });
  });

  it('should erase the pilot...no...Goose no!!!', () => {
    request('localhost:' + PORT)
    .delete('/api/pilot/' + this.pilot._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Pilot Honorably Discharged');
    });
  });
});
