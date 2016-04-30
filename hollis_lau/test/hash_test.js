const expect = require("chai").expect;
const mongoose = require("mongoose");
const User = require(__dirname + "/../models/user");

describe("Token hash generation", () => {
  before((done) => {
    var newUser;

    mongoose.connect("mongodb://localhost/hash_test");
    newUser = new User({ username: "testuser", password: "testpassword" });

    newUser.save((err, data) => {
      if (err) {
        throw err;
      }

      this.user = data;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });

  it("creates a random hash", (done) => {
    this.user.generateHash((err, hash) => {
      expect(err).to.eql(null);
      expect(hash.length).to.not.eql(0);
      expect(hash).to.eql(this.user.tokenHash);
      done();
    });
  });
});
