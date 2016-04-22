const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 4545;
process.env.MONGODB_URI = 'mongodb://localhost/jedi_sith_test_db';
require(__dirname + '/../server.js');
const Sith = require(__dirname + '/../models/sith');

describe('The POST requests', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should add a Sith to the DB', (done) => {
    request('localhost:' + port)
    .post('/api/jedi')
    .send({ name: 'Darth Bandon', ranking: 'Sith Lord', weaponPreference: 'Double Bladed', lightsaberColor: 'gold', catchphrase: 'Bow before me' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Darth Bandon');
      expect(res.body.ranking).to.eql('Sith Lord');
      expect(res.body.weaponPreference).to.eql('Double Bladed');
      expect(res.body.lightsaberColor).to.eql('gold');
      expect(res.body.catchphrase).to.eql('Bow before me');
      expect(res.body.handCount).to.eql('2');
      done();
    });
  });

});
