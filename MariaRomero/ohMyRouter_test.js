const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
var port = process.env.PORT = 5555;
process.env.MONGODB_URI = 'mongodb://localhost/animals_testDB';
var server = require(__dirname + '/../lib/server');

describe('the GET method at /bears', () => {
  it('should get a list of all the bears', (done) => {
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
});

describe('the POST method at /bears', () => {
  it('should add add a new bear to the db', (done) => {
    request('localhost:' + port)
    .post('/api/bears')
    .send()

  });
});
