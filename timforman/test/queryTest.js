const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;

process.env.MONGODB_URI = 'mongodb://localhost/query_test_db';
require(__dirname + '/../server');

describe('the POST method', () => {
  it('should add a band', (done) => {
    request('localhost:' + port)
    .post('/api/bands')
    .send({ bandName: 'Husker Du', genre: 'Alternative' })
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log('added ' + res.body.bandName);
      expect(res.body.bandName).to.eql('Husker Du');
      expect(res.body.genre).to.eql('Alternative');
      done();
    });
  });
});

describe('the POST method', () => {
  it('should add a song', (done) => {
    request('localhost:' + port)
    .post('/api/songs')
    .send({ title: 'Diane', bandName: 'Husker Du' })
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log('added ' + res.body.title);
      expect(res.body.title).to.eql('Diane');
      expect(res.body.bandName).to.eql('Husker Du');
      done();
    });
  });
});

describe('the query', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should return the band name with song title(s)', (done) => {
    request('localhost:' + port)
    .get('/api/bandName/Husker Du')
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log(res.body);
      expect(res.body).to.eql({ bands: ['Husker Du'], songs: ['Diane'] });
      done();
    });
  });
});
