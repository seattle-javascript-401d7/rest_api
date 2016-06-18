const expect = require('chai').expect;
const User = require(__dirname + '/../models/user');
const mongoose = require('mongoose');

describe('user has hash', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/user_hash_testing');
    var newUser = new User({username: 'test', password: 'test'});

    newUser.save((err, data) => {
      if(err) throw err;
      this.user = data;
      done();
    });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(done);
  });
  it('should be able to create a random hash', function(done) {
    this.user.generateFindHash((err, hash) => {
      expect(err).to.eql(null);
      expect(hash.length).to.eql(64);
      expect(hash).to.eql(this.user.findHash);
      done();
    });
  });
});
