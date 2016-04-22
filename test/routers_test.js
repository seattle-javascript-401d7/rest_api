const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const port = process.env.PORT = 4545;
process.env.MONGODB_URI = 'mongodb://localhost/jedi_sith_test_db';
const server = require(__dirname + '/../server.js');
var Jedi = require(__dirname + '/../models/jedi');
var Sith = require(__dirname + '/../models/sith');
// const battleRouter = require(__dirname + '/../routes/battleRouter');


describe('the GET request for versusRouter', () => {
  before((done) => {
    server.listen(port, () => {
      console.log('server up on port ' + port);
      done();
    });
  });
  beforeEach((done) => {
    var newJedi = new Jedi({
      name: 'The Outside',
      ranking: 'Nature',
      weaponPreference: 'Sunlight',
      lightsaberColor: 'rainbows',
      catchphrase: 'Fresh Air!',
      handCount: '0'
    });
    newJedi.save((err, data) => {
      if (err) console.log(err);
      this.jedi = data;
      done();
    });
  });
  beforeEach((done) => {
    var sithRouter = new Sith({
      name: 'Darth Tester',
      ranking: 'Expert Coder',
      weaponPreference: '404 errors',
      lightsaberColor: '010101',
      catchphrase: 'ERROR',
      handCount: '8'
    });
    sithRouter.save((err, data) => {
      if (err) console.log(err);
      this.sith = data;
      done();
    });
  });

  it('should return the length of the collections', (done) => {
    request('localhost:' + port)
    .get('/api/versus')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.sith).to.eql(1);
      expect(res.body.jedi).to.eql(1);
      done();
    });
  });
});


describe('the GET request for battleRouter', () => {
  beforeEach((done) => {
    var newJedi = new Jedi({
      name: 'The Outside2',
      ranking: 'Nature',
      weaponPreference: 'Sunlight',
      lightsaberColor: 'rainbows',
      catchphrase: 'Fresh Air!',
      handCount: '0'
    });
    newJedi.save((err, data) => {
      if (err) console.log(err);
      this.jedi = data;
      done();
    });
  });
  beforeEach((done) => {
    var sithRouter = new Sith({
      name: 'Darth Tester2',
      ranking: 'Expert Coder',
      weaponPreference: '404 errors',
      lightsaberColor: '010101',
      catchphrase: 'ERROR',
      handCount: '8'
    });
    sithRouter.save((err, data) => {
      if (err) console.log(err);
      this.sith = data;
      done();
    });
  });

  it('should count all of the Jedi and Sith on a get request to battle', (done) => {
    request('localhost:' + port)
    .get('/api/battle')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.theVictor).to.have.string('defeated');
      done();
    });
  });
});
