const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const User = require(__dirname + '/../models/user');
// const mongoose = require('mongoose');

describe('a new username and password ', function() {
  before((done) => {
    // mongoose.connect('mongodb://localhost/rand_usr_hash_test');
    var newUser = new User({ username: 'test', password: 'testPW' });
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
