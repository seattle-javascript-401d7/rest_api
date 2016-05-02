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
var Lion = require(__dirname + '/../models/lions');
var Tiger = require(__dirname + '/../models/tigers');
const errorHandler = require(__dirname + '/../lib/errorHandler');

describe('the routes at /ohMy', () => {
  before( (done) => {
    server = app(port, process.env.MONGODB_URI || 'mongodb://localhost/animals_testDB', console.log('server up on ' + port) );
    var newLion = new Lion({ name: 'testAlex', variety: 'testing', location: 'Madagascar', continent: 'Africa' });
    newLion.save( (err) => {
      if (err) return errorHandler(err);
    });
    var newLion2 = new Lion({ name: 'testSimba', variety: 'testing', location: 'testSavanah', continent: 'Africa' });
    newLion2.save( (err) => {
      if (err) return errorHandler(err);
    });
    var newBear = new Bear({ name: 'testYogi', variety: 'testing', location: 'Jellystone', continent: 'North_America' });
    newBear.save( (err) => {
      if (err) return errorHandler(err);
    });
    var newBear2 = new Bear({ name: 'testPooh', variety: 'testing', location: 'Ashdown', continent: 'Europe' });
    newBear2.save( (err) => {
      if (err) return errorHandler(err);
    });
    var newTiger = new Tiger({ name: 'testRajah', variety: 'testing', location: 'Agrabah', continent: 'Asia' });
    newTiger.save( (err) => {
      if (err) return errorHandler(err);
    });
    var newTiger2 = new Tiger({ name: 'testTony', variety: 'cereal', location: 'Kellog', continent: 'North_America' });
    newTiger2.save( (err) => {
      if (err) return errorHandler(err);
    });
    var newTiger3 = new Tiger({ name: 'testTiger', variety: 'testing', location: 'London zoo', continent: 'Europe' });
    newTiger3.save( (err) => {
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
  it('should get the total number of each animal on a GET request', (done) => {
    var lionCount = 0;
    var tigerCount = 0;
    var bearCount = 0;
    request('localhost:' + port)
    .get('/api/ohMy')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      Lion.count(null, (err, count) => {
        if (err) return errorHandler(err);
        lionCount = count;
        expect(lionCount).to.eql(2);
      });
      Tiger.count(null, (err, count) => {
        if (err) return errorHandler(err);
        tigerCount = count;
        expect(tigerCount).to.eql(3);
      });
      Bear.count(null, (err, count) => {
        if (err) return errorHandler(err);
        bearCount = count;
        expect(bearCount).to.eql(2);
        expect(res.text).to.eql('There are more tigers than lions and bears! Oh my! \n There are 3 tigers, 2 lions, and 2 bears.');
        done();
      });
    });
  });
  it('should get all of the animals on a specific continent on a GET request to /ohMy/:continent', (done) => {
    request('localhost:' + port)
    .get('/api/ohMy/North_America')
    .end( (err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql('Lions, tigers, and bears are friends, but they can\'t cross oceans.  They' +
      ' can only be friends with others on their continent.  The friends in North_America are:' +
      '   testTony who lives in Kellog,  testYogi who lives in Jellystone,  ');
      done();
    });
  });
});
