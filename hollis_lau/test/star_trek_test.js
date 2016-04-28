const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const app = require(__dirname + "/../_server");

describe("Star Trek resource", () => {
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

  describe("POST method", () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => done());
    });

    it("creates a new Star Trek character", (done) => {
      request("localhost:" + this.PORT)
        .post("/api/startrekchars")
        .send({
          name: "Jean-Luc Picard",
          gender: "M",
          rank: "Captain",
          power: 8
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql("Jean-Luc Picard");
          expect(res.body.gender).to.eql("M");
          expect(res.body.rank).to.eql("Captain");
          expect(res.body.weapon).to.eql("Phaser");
          expect(res.body.power).to.eql(8);
          expect(res.body.ship).to.eql("Enterprise");
          done();
        });
    });
  });

  describe("GET method", () => {
    it("reads all Star Trek characters", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/startrekchars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body.length).to.eql(0);
          done();
        });
    });
  });

  describe("PUT and DELETE methods", () => {
    before((done) => {
      var newStarTrekChar = new StarTrekChar({
        name: "Data",
        rank: "Lieutenant Commander",
        power: 9
      });

      newStarTrekChar.save((err, data) => {
        if (err) return process.stderr.write(err + "\n");

        this.starTrekChar = data;
        done();
      });
    });

    it("updates the Star Trek character on a PUT request", (done) => {
      request("localhost:" + this.PORT)
        .put("/api/startrekchars/" + this.starTrekChar._id)
        .send({
          name: "William T. Riker",
          gender: "M",
          rank: "Commander",
          power: 7
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Star Trek character updated!");
          done();
        });
    });

    it("deletes the Star Trek character on a DELETE request", (done) => {
      request("localhost:" + this.PORT)
        .delete("/api/startrekchars/" + this.starTrekChar._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Star Trek character deleted!");
          done();
        });
    });
  });
});
