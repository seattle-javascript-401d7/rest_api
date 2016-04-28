const expect = require('chai').expect;
const User = require(__dirname + '/../models/user');
// const mongoose = require('mongoose');

describe('random user find hash', function() {
  before((done) => {
    // mongoose.connect('mongodb://localhost/rand_usr_hash_test');
    var newUser = new User({ username: 'test', password: 'testPW ' });
    newUser.save(function(err, data) {
      if (err) throw err;
      this.user = data;
      done();
    });
  });

  after((done) => {
    this.user.remove(done);
  });
});
