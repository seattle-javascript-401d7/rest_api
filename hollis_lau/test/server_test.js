const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const server = require(__dirname + "/../server");

describe("SciFi server", () => {
  before((done) => {
    this.portBackup = process.env.PORT;
    this.mongoUriBackup = process.env.MONGODB_URI;
    this.port = process.env.PORT = 1234;
    process.env.MONGODB_URI = "mongodb://localhost/scifi_test";
    this.sciFiServer = server(this.port, () => {
      done();
    });
  });

  after((done) => {
    process.env.PORT = this.portBackup;
    process.env.MONGODB_URI = this.mongoUriBackup;
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        this.sciFiServer.close(() => {
          done();
        });
      });
    });
  });

  describe("POST method", () => {
    it("creates a new Star Trek character", (done) => {
      request("localhost:" + this.port)
        .post("/api/startrekchars")
        .send({
          name: "Jean-Luc Picard",
          gender: "M",
          rank: "Captain"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql("Jean-Luc Picard");
          expect(res.body.gender).to.eql("M");
          expect(res.body.rank).to.eql("Captain");
          expect(res.body.ship).to.eql("Enterprise");
          done();
        });
    });

    it("creates a new Star Wars character", (done) => {
      request("localhost:" + this.port)
        .post("/api/starwarschars")
        .send({
          name: "Luke Skywalker",
          gender: "M",
          weapon: "Lightsaber",
          planet: "Tatooine"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql("Luke Skywalker");
          expect(res.body.gender).to.eql("M");
          expect(res.body.weapon).to.eql("Lightsaber");
          expect(res.body.planet).to.eql("Tatooine");
          done();
        });
    });
  });

  describe("GET method", () => {
    it("reads all Star Trek characters", (done) => {
      request("localhost:" + this.port)
        .get("/api/startrekchars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });

    it("reads all Star Wars characters", (done) => {
      request("localhost:" + this.port)
        .get("/api/starwarschars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });
  });

  describe("PUT and DELETE methods for Star Trek resource", () => {
    before((done) => {
      var newStarTrekChar = new StarTrekChar({
        name: "Data",
        rank: "Lieutenant Commander"
      });

      newStarTrekChar.save((err, data) => {
        if (err) return process.stderr.write(err);

        this.starTrekChar = data;
        done();
      });
    });

    it("updates the Star Trek character on a PUT request", (done) => {
      request("localhost:" + this.port)
        .put("/api/startrekchars/" + this.starTrekChar._id)
        .send({
          name: "William T. Riker",
          gender: "M",
          rank: "Commander"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("Star Trek character updated!");
          done();
        });
    });

    it("deletes the Star Trek character on a DELETE request", (done) => {
      request("localhost:" + this.port)
        .delete("/api/startrekchars/" + this.starTrekChar._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("Star Trek character deleted!");
          done();
        });
    });
  });
});
