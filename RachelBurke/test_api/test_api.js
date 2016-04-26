var chai = require('chai');
var expect = chai.expect;
// var chaiHttp = require('chai-http');
// chai.use(chaihttp);
var request = chai.request;
var mongoose = require('mongoose');
var port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/wines_test_db';
require(__dirname + '/server.js');

describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be good wine', (done) => {
    request('localhost:' + port)
    .post('/api/wines')
    .send({ name: 'Fancy French Vineyard', year: '1800', grapes: 'Grenache / Syrah',
      country: 'France', description: 'Delicious' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Fancy French Vineyard');
      expect(res.body.year).to.eql('1800');
      expect(res.body.grapes).to.eql('Grenache / Syrah');
      expect(res.body.country).to.eql('France');
      expect(res.body.description).to.eql('Delicious');
      done();
    });
  });

  describe('the GET method', () => {
    it('should get all the bears', (done) => {
      request('localhost:' + port)
      .get('/api/wines')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Fancy Spanish Vineyard');
        expect(res.body.year).to.eql('2006');
        expect(res.body.grapes).to.eql('Tempranillo');
        expect(res.body.country).to.eql('Spain');
        expect(res.body.description).to.eql('Intoxicating');
        done();
      });
    });
  });
});
