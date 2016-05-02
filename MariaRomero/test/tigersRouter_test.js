const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

var port = process.env.PORT = 5555;
const app = require(__dirname + '/../server/_server');
var server;

var Tiger = require(__dirname + '/../models/tigers');
const errorHandler = require(__dirname + '/../lib/errorHandler');

var User = require(__dirname + '/../models/user');
process.env.APP_SECRET = 'testingSecret';

describe('the routes at /tigers', () => {
  before( (done) => {
    server = app(port, process.env.MONGODB_URI || 'mongodb://localhost/animals_testDB', console.log('server up on ' + port));

    var newUser = new User({ username: 'McTest', password: 'sandwich' });
    newUser.save( (err, data) => {
      if (err) throw err;
      this.user = data;
      this.token = data.generateToken();
    });

    var newTiger = new Tiger({ name: 'testTiger', variety: 'testing', location: 'jungle', continent: 'Asia' });
    newTiger.save( (err, data) => {
      if (err) return errorHandler(err);
      this.tiger = data;
    });
    var newTiger2 = new Tiger({ name: 'Tony', variety: 'cereal', location: 'Kellog', continent: 'North_America' });
    newTiger2.save( (err) => {
      if (err) return errorHandler(err);
      done();
    });
  });
  after( (done) => {
    mongoose.connection.db.dropDatabase( () => {
      mongoose.disconnect( () => {
        server.close( () => {
          done();
        });
      });
    });
  });
  it('should get a list of all the tigers on a GET request', (done) => {
    request('localhost:' + port)
    .get('/api/tigers')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(2);
      done();
    });
  });
  it('should add a new tiger to the db on a POST request', (done) => {
    request('localhost:' + port)
    .post('/api/tigers')
    .set('token', this.token)
    .send({ name: 'Hobbes', variety: 'cartoon', location: 'newspaper', continent: 'North_America' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('Hobbes');
      expect(res.body.variety).to.eql('cartoon');
      expect(res.body.location).to.eql('newspaper');
      expect(res.body.continent).to.eql('North_America');
      done();
    });
  });
  it('should update the tiger\'s information on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/tigers/' + this.tiger._id)
    .set('token', this.token)
    .send({ name: 'Hobbes', variety: 'cartoon', location: 'Calvin\'s house', continent: 'North_America' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('tigers db updated');
      done();
    });
  });
  it('should remove a tiger from the db on a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/tigers/' + this.tiger._id)
    .set('token', this.token)
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('tiger removed from db');
      done();
    });
  });
});
