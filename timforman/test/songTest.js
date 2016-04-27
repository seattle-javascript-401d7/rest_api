const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;

process.env.MONGODB_URI = 'mongodb://localhost/songs_test_db';
require(__dirname + '/../server');
const Song = require(__dirname + '/../models/song');

describe('the POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should add a song', (done) => {
    request('localhost:' + port)
    .post('/api/songs')
    .send({ title: 'Rainmaker', bandName: 'Sparklehorse' })
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log('added ' + res.body.title);
      expect(res.body.title).to.eql('Rainmaker');
      expect(res.body.bandName).to.eql('Sparklehorse');
      done();
    });
  });
});

describe('the GET method', () => {
  it('should return an array of song names', (done) => {
    request('localhost:' + port)
    .get('/api/songs')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('routes to test PUT and DELETE: ', () => {

  beforeEach((done) => {
    var newsong = new Song({ title: 'testsong', bandName: 'testing' });
    newsong.save((err, data) => {
      if (err) return serverErrorHandler(err, data);
      this.song = data;
      done();
    });
  });

  afterEach((done) => {
    this.song.remove(() => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should change the song on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/songs/' + this.song._id)
    .send({ title: 'Would', bandName: 'Alice In Chains' })
    .end((err, res) => {
      console.log(res.body.msg);
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('song edit complete');
      done();
    });
  });

  it('should remove song with a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/songs/' + this.song._id)
    .end((err, res) => {
      console.log(res.body.msg);
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('song delete complete');
      done();
    });
  });
});
