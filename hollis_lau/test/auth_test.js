const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const User = require(__dirname + "/../models/user");
const app = require(__dirname + "/../_server");

describe("Authentication resource", () => {
  before((done) => {
    this.portBackup = process.env.PORT;
    this.mongoDbUriBackup = process.env.MONGODB_URI;
    this.PORT = process.env.PORT = 1234;
    this.MONGODB_URI = process.env.MONGODB_URI = "mongodb://localhost/scifi_test";
    this.server = app(this.PORT, this.MONGODB_URI, () => {
      process.stdout.write("Test server up on PORT " + this.PORT + "\n");
      done();
    });
  });

  after((done) => {
    process.env.PORT = this.portBackup;
    process.env.MONGODB_URI = this.mongoDbUriBackup;
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        this.server.close(done);
      });
    });
  });

  describe("Sign up route", () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(done);
    });

    it("requires a new username", (done) => {
      request("localhost:" + this.PORT)
        .post("/api/signup")
        .send({
          username: "",
          password: "testpassword"
        })
        .end((err, res) => {
          expect(err).to.exist;
          expect(res).to.have.status(500);
          expect(res.body.msg).to.eql("Create a new username!");
          done();
        });
    });

    it("requires a new password", (done) => {
      request("localhost:" + this.PORT)
        .post("/api/signup")
        .send({
          username: "testuser",
          password: ""
        })
        .end((err, res) => {
          expect(err).to.exist;
          expect(res).to.have.status(500);
          expect(res.body.msg).to.eql("Create a new password!");
          done();
        });
    });

    it("creates a new user", (done) => {
      request("localhost:" + this.PORT)
        .post("/api/signup")
        .send({
          username: "testuser",
          password: "testpassword"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("New user created!");
          done();
        });
    });
  });

  describe("Sign in route", () => {
    before((done) => {
      var newUser = new User({ username: "testuser", password: "testpassword" });

      newUser.generateHash(newUser.password);

      newUser.save((err, data) => {
        if (err) {
          throw new Error("Could not save user!");
        }
        done();
      });
    });

    it("requires a valid username", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/signin")
        .auth("baduser", "testpassword")
        .end((err, res) => {
          expect(err).to.exist;
          expect(res).to.have.status(500);
          expect(res.body.msg).to.eql("User not found!");
          done();
        });
    });

    it("requires a valid password", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/signin")
        .auth("testuser", "badpassword")
        .end((err, res) => {
          expect(err).to.exist;
          expect(res).to.have.status(500);
          expect(res.body.msg).to.eql("Incorrect password!");
          done();
        });
    });

    it("signs in an existing user", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/signin")
        .auth("testuser", "testpassword")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Login successful!");
          done();
        });
    });
  });
});
