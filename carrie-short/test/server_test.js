const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 5000;
const server = require(__dirname + '/../server');

describe('bad routes', () => {
  before((done) => {
    server.listen(port, () => {
      console.log('server up on port ' + port);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
    server.close();
  });
  it('should return 404 message on bad routes', (done) => {
    request('localhost:' + port)
    .get('/iambad')
    .end((err, res) => {
      expect(err.toString()).to.eql('Error: Not Found');
      expect(res).to.have.status(404);
      expect(res.text).to.eql('Sorry cant find that!');
      done();
    });
  });
});
