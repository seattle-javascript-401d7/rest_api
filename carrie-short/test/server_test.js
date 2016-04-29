const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const port = process.env.PORT = 5000;
const setup = require(__dirname + '/test_setup');
const teardown = require(__dirname + '/test_teardown');

describe('bad routes', () => {
  before((done) => {
    setup(done);
  });
  after((done) => {
    teardown(done);
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
