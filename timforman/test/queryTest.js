const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;
const server = require(__dirname + '/../_server');
const User = require(__dirname + '/../models/user');

process.env.APP_SECRET = 'testsecret';

process.on('exit', () => {
  if (mongoose.connection.db) {
    mongoose.connection.db.dropDatabase();
  }
});

describe('the query', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/query_test_db', done);
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

  it('should add a song', (done) => {
    request('localhost:' + port)
    .post('/api/songs')
    .set('token', this.token)
    .send({ title: 'Diane', bandName: 'Husker Du' })
    .end((err, res) => {
      expect(err).to.eql(null);
      console.log('added ' + res.body.title);
      expect(res.body.title).to.eql('Diane');
      expect(res.body.bandName).to.eql('Husker Du');
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
