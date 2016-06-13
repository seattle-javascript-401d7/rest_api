const expect = require('chai').expect;
const User = require(__dirname + '/../models/user');
const mongoose = require('mongoose');

describe('random user find hash', function() { // eslint-disable-line
  before(function(done) {
    mongoose.connect('mongodb://localhost/user_auth_test');
    var newUser = new User({ username: 'test', password: 'test' });
    newUser.save((err, data) => {
      if (err) throw err;
      this.user = data;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });

  it('should be able to create a random hash', function(done) {
    this.user.generateFindHash((err, hash) => {
      expect(err).to.eql(null);
      expect(hash.length).to.not.eql(0);
      expect(hash).to.eql(this.user.findHash);
      done();
    });
  });
});
