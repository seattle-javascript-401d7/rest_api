const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

const User = require(__dirname + '/../models/user');

describe('user find hash', () => {
  before(function(done) {
    var newUser = new User({ username: 'test', password: 'test' });
    newUser.save((err, data) => {
      if (err) throw err;
      this.user = data;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(done);
  });

  it('should create a new random hash', function(done) {
    this.user.generateFindHash((err, hash) => {
      expect(err).to.eql(null);
      expect(hash.length).to.not.eql(0);
      expect(hash).to.eql(this.user.findHash);
      done();
    });
  });
});
