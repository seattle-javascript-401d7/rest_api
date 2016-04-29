const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const serverErrorHandler = require(__dirname + '/../lib/error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;
const server = require(__dirname + '/../_server');
const Band = require(__dirname + '/../models/band');
const User = require(__dirname + '/../models/user');

process.env.APP_SECRET = 'testsecret';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('the bands router', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/bands_test_db', done);
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

    it('should add a band', (done) => {
      request('localhost:' + port)
      .post('/api/bands')
      .set('token', this.token)
      .send({ bandName: 'Husker Du', genre: 'Alternative' })
      .end((err, res) => {
        expect(err).to.eql(null);
        console.log('added ' + res.body.bandName);
        expect(res.body.bandName).to.eql('Husker Du');
        expect(res.body.genre).to.eql('Alternative');
        done();
      });
    });

  describe('routes to test PUT and DELETE: ', () => {

    beforeEach((done) => {
      var newBand = new Band({ bandName: 'testband', genre: 'testing' });
      newBand.save((err, data) => {
        if (err) return serverErrorHandler(err, data);
        this.band = data;
        done();
      });
    });

    afterEach((done) => {
      this.band.remove(() => {
        done();
      });
    });

    it('should change the band on a PUT request', (done) => {
      request('localhost:' + port)
      .put('/api/bands/' + this.band._id)
      .send({ bandName: 'Marvin Gaye', genre: 'R&B' })
      .end((err, res) => {
        console.log(res.body.msg);
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('band edit complete');
        done();
      });
    });

    it('should remove band with a DELETE request', (done) => {
      request('localhost:' + port)
      .delete('/api/bands/' + this.band._id)
      .end((err, res) => {
        console.log(res.body.msg);
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('band delete complete');
        done();
      });
    });
  });

  describe('the GET method', () => {
    it('should return an array', (done) => {
      var token = this.token;
      request('localhost:' + port)
      .get('/api/bands')
      .set('token', token)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
    });
  });
});
