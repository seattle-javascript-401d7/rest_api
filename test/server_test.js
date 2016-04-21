const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

var PORT = process.env.PORT = 5150;
process.env.MONGO_URI = 'mongodb://localhost/pilots_test_db';
require(__dirname + '/../server');

describe('testing the POST', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should recruit a new pilot', (done) => {
      request('localhost:' + PORT)
      .post('/api/pilots')
      .send({ name: 'Pete Mitchell', callSign: 'Maverick', jet: 'F-14', favoriteSong: 'Danger Zone' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Pete Mitchell');
        expect(res.body.callSign).to.eql('Maverick');
        expect(res.body.jet[0]).to.eql('F-14');
        expect(res.body.favoriteSong).to.eql('Danger Zone');
        done();
      });
  });
});

describe('get the pilot roster', () => {
  it('should get the list of all the pilots', (done) => {
    request('localhost:' + PORT)
    .get('/api/pilots')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});
