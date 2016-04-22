const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 4545;
process.env.MONGODB_URI = 'mongodb://localhost/jedi_sith_test_db';
require(__dirname + '/../server.js');
const Jedi = require(__dirname + '/../models/jedi');

describe('The POST requests', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should add a Jedi to the DB', (done) => {
    request('localhost:' + port)
    .post('/api/jedi')
    .send({ name: 'Brandon Parker', ranking: 'Jedi EMPEROR', weaponPreference: 'Two lightsabers', lightsaberColor: 'white', catchphrase: 'I win' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Brandon Parker');
      expect(res.body.ranking).to.eql('Jedi EMPEROR');
      expect(res.body.weaponPreference).to.eql('Two lightsabers');
      expect(res.body.lightsaberColor).to.eql('white');
      expect(res.body.catchphrase).to.eql('I win');
      expect(res.body.handCount).to.eql('2');
      done();
    });
  });

});
