const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;
const server = require(__dirname + '/../_server');
const Song = require(__dirname + '/../models/song');
const User = require(__dirname + '/../models/user');

process.env.APP_SECRET = 'testsecret';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('the songs router', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/songs_test_db', done);
  });

  before((done) => {
    var user = new User({ username: 'test', password: 'test' });
    user.save((err, data) => {
      if (err) throw err;
      this.user = data;
      data.generateToken((err, token) => {
        if (err) throw err;
        this.token = token;
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should add a song', (done) => {
    request('localhost:' + port)
    .post('/api/songs')
    .set('token', this.token)
    .send({ title: 'Rainmaker', bandName: 'Sparklehorse' })
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log('added ' + res.body.title);
      expect(res.body.title).to.eql('Rainmaker');
      expect(res.body.bandName).to.eql('Sparklehorse');
      done();
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

  describe('the GET method', () => {
    it('should return an array', (done) => {
      var token = this.token;
      request('localhost:' + port)
      .get('/api/songs')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });
});
