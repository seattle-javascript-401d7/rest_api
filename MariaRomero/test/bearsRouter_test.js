/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

var port = process.env.PORT = 5555;
const app = require(__dirname + '/../server/_server');
var server;

var Bear = require(__dirname + '/../models/bears');
const errorHandler = require(__dirname + '/../lib/errorHandler');

var User = require(__dirname + '/../models/user');
process.env.APP_SECRET = 'testingSecret';


describe('the requests at /bears', () => {
  before( (done) => {
    server = app(port, process.env.MONGODB_URI || 'mongodb://localhost/animals_testDB', console.log('server up on ' + port));

    var newUser = new User({ username: 'testName', password: 'testPassword' });
    newUser.save( (err, data) => {
      if (err) throw err;
      this.user = data;
      this.token = data.generateToken();
    });

    var newBear = new Bear({ name: 'testBear', variety: 'testing', location: 'testLand', continent: 'South_Test' });
    newBear.save( (err, data) => {
      if (err) return errorHandler(err);
      this.bear = data;
    });
    var newBear2 = new Bear({ name: 'Testy McTest', variety: 'testing', location: 'testTown', continent: 'North_Test' });
    newBear2.save( (err) => {
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
  it('should get a list of all the bears on a GET request', (done) => {
    request('localhost:' + port)
    .get('/api/bears')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(2);
      done();
    });
  });
  it('should add add a new bear to the db on a POST request', (done) => {
    request('localhost:' + port)
    .post('/api/bears')
    .set('token', this.token)
    .send({ name: 'BooBoo', variety: 'brown', location: 'Jellystone', continent: 'North_America' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('BooBoo');
      expect(res.body.variety).to.eql('brown');
      expect(res.body.location).to.eql('Jellystone');
      expect(res.body.continent).to.eql('North_America');
      done();
    });
  });
  it('should update the bear\'s information on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/bears/' + this.bear._id)
    .set('token', this.token)
    .send({ name: 'testBear2', variety: 'grizzly', location: 'testLand', continent: 'South_Test' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('bears db updated');
      done();
    });
  });
  it('should remove a bear from the db on a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/bears/' + this.bear._id)
    .set('token', this.token)
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('bear removed from db');
      done();
    });
  });
});
