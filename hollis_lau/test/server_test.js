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
  var sciFiServer;
  var portBackup = process.env.PORT;
  var mongoUriBackup = process.env.MONGODB_URI;
  var port = process.env.PORT = 1234;

  process.env.MONGODB_URI = "mongodb://localhost/scifi_test";
  before((done) => {
    sciFiServer = server(port, () => {
      done();
    });
  });

  after((done) => {
    process.env.PORT = portBackup;
    process.env.MONGODB_URI = mongoUriBackup;
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        sciFiServer.close(() => {
          done();
        });
      });
    });
  });

  describe("POST method", () => {
    it("saves a new Star Trek character", (done) => {
      request("localhost:" + port)
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

    it("saves a new Star Wars character", (done) => {
      request("localhost:" + port)
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
    it("gets all Star Trek characters", (done) => {
      request("localhost:" + port)
        .get("/api/startrekchars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });

    it("gets all Star Wars characters", (done) => {
      request("localhost:" + port)
        .get("/api/starwarschars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          done();
        });
    });
  });
});
