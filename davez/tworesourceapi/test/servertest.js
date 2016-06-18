const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const request = chai.request;
const mongoose = require('mongoose');

process.env.MONGO_URI = 'mongodb://localhost/server_test_db';
require(__dirname + '/../server');

describe('the GET method', () => {
  it('should list all movies', (done) => {
    request('localhost:7777')
    .get('/api/movies')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});
describe('the POST and DELETE methods', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should add a movie to the dataBase', (done) => {
    request('localhost:7777')
    .post('/api/movies')
    .send({ name: 'Die Hard', rating: 'R' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Die Hard');
      expect(res.body.rating).to.eql('R');
      done();
    });
  });
  it('should update movie based on its name', (done) => {
    request('localhost:7777')
    .put('/api/movies/\'Die Hard\'')
    .send({ name: 'Die Hard 2', rating: 'R' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
  it('should delete a movie from the database by its name', (done) => {
    request('localhost:7777')
    .delete('/api/movies/\'Die Hard 2\'')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
});
