const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

var port = process.env.PORT = 5555;
const app = require(__dirname + '/../server/_server');
var server;

var Lion = require(__dirname + '/../models/lions');
const errorHandler = require(__dirname + '/../lib/errorHandler');

describe('the routes at /lions', () => {
  before( (done) => {
    server = app(port, process.env.MONGODB_URI || 'mongodb://localhost/animals_testDB', console.log('server up on ' + port) );
    var newLion = new Lion({ name: 'testLion', variety: 'testing', location: 'testPlain', continent: 'Africa' });
    newLion.save( (err, data) => {
      if (err) return errorHandler(err);
      this.lion = data;
    });
    var newLion2 = new Lion({ name: 'testSimba', variety: 'testing', location: 'testSavanah', continent: 'Africa' });
    newLion2.save( (err) => {
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
  it('should get a list of all the lions on a GET request', (done) => {
    request('localhost:' + port)
    .get('/api/lions')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(2);
      done();
    });
  });
  it('should add a new lion to the db on a POST request', (done) => {
    request('localhost:' + port)
    .post('/api/lions')
    .send({ name: 'Nala', variety: 'African', location: 'Pride_Lands', continent: 'Africa' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('Nala');
      expect(res.body.variety).to.eql('African');
      expect(res.body.location).to.eql('Pride_Lands');
      expect(res.body.continent).to.eql('Africa');
      done();
    });
  });
  it('should update the lion\'s information on a PUT request', (done) => {
    request('localhost:' + port)
    .put('/api/lions/' + this.lion._id)
    .send({ name: 'Nala', variety: 'African', location: 'Bronx zoo', continent: 'Africa' })
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('lions db updated');
      done();
    });
  });
  it('should remove a lion from the db on a DELETE request', (done) => {
    request('localhost:' + port)
    .delete('/api/lions/' + this.lion._id)
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.msg).to.eql('lion removed from db');
      done();
    });
  });
});
