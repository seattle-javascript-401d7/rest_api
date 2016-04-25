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
    after((done) => {
      mongoose.connection.db.dropDatabase(() => done());
    });

    it("creates a new Star Trek character", (done) => {
      request("localhost:" + this.port)
        .post("/api/startrekchars")
        .send({
          name: "Jean-Luc Picard",
          gender: "M",
          rank: "Captain",
          power: 8
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql("Jean-Luc Picard");
          expect(res.body.gender).to.eql("M");
          expect(res.body.rank).to.eql("Captain");
          expect(res.body.weapon).to.eql("Phaser");
          expect(res.body.power).to.eql(8);
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
          power: 10,
          planet: "Tatooine"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql("Luke Skywalker");
          expect(res.body.gender).to.eql("M");
          expect(res.body.weapon).to.eql("Lightsaber");
          expect(res.body.power).to.eql(10);
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
          expect(res.body.length).to.eql(0);
          done();
        });
    });

    it("reads all Star Wars characters", (done) => {
      request("localhost:" + this.port)
        .get("/api/starwarschars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body.length).to.eql(0);
          done();
        });
    });
  });

  describe("PUT and DELETE methods for Star Trek resource", () => {
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
      request("localhost:" + this.port)
        .put("/api/startrekchars/" + this.starTrekChar._id)
        .send({
          name: "William T. Riker",
          gender: "M",
          rank: "Commander",
          power: 7
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

  describe("POST and DELETE methods for Star Wars resource", () => {
    before((done) => {
      var newStarWarsChar = new StarWarsChar({
        name: "Han Solo",
        gender: "M",
        weapon: "Heavy blaster pistol",
        power: 7,
        planet: "Corellia"
      });

      newStarWarsChar.save((err, data) => {
        if (err) return process.stderr.write(err + "\n");

        this.starWarsChar = data;
        done();
      });
    });

    it("updates the Star Wars character on a PUT request", (done) => {
      request("localhost:" + this.port)
        .put("/api/starwarschars/" + this.starWarsChar._id)
        .send({
          name: "Chewbacca",
          gender: "M",
          weapon: "Bowcaster",
          power: 8,
          planet: "Kashyyyk"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("Star Wars character updated!");
          done();
        });
    });

    it("deletes the Star Wars character on a DELETE request", (done) => {
      request("localhost:" + this.port)
        .delete("/api/starwarschars/" + this.starWarsChar._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("Star Wars character deleted!");
          done();
        });
    });
  });

  describe("battle endpoint with empty collection", () => {
    it("instructs user to add characters", (done) => {
      request("localhost:" + this.port)
        .get("/api/battle")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql("Please add at least one Star Trek and Star Wars character!");
          done();
        });
    });
  });

  describe("battle endpoint with random characters", () => {
    before((done) => {
      var picard = new StarTrekChar({ name: "Jean-Luc Picard", power: 8 });
      var laforge = new StarTrekChar({ name: "Geordi La Forge", power: 6 });
      var skywalker = new StarWarsChar({ name: "Luke Skywalker", weapon: "Lightsaber", power: 10 });
      var binks = new StarWarsChar({ name: "Jar Jar Binks", weapon: "Booma", power: 4 });

      picard.save((err, data) => {
        if (err) return process.stderr.write(err + "\n");

        this.picard = data;
        laforge.save((err, data) => {
          if (err) return process.stderr.write(err + "\n");

          this.laforge = data;
          skywalker.save((err, data) => {
            if (err) return process.stderr.write(err + "\n");

            this.skywalker = data;
            binks.save((err, data) => {
              if (err) return process.stderr.write(err + "\n");

              this.binks = data;
              done();
            });
          });
        });
      });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(() => done());
    });

    it("compares power levels of two characters and returns a victor", (done) => {
      request("localhost:" + this.port)
        .get("/api/battle")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.winnerPower).to.be.above(res.body.loserPower);
          expect(res.body.msg).to.eql(
            res.body.winnerName + " defeats " + res.body.loserName + " with a " +
            res.body.winnerWeapon + "!"
          );
          done();
        });
    });
  });

  describe("battle endpoint with equal power levels", () => {
    before((done) => {
      var tribble = new StarTrekChar({ name: "Tribble", power: 1, weapon: "Fur" });
      var jawa = new StarWarsChar({ name: "Jawa", power: 1, weapon: "Tools" });

      tribble.save((err, data) => {
        if (err) return process.stderr.write(err + "\n");

        this.tribble = data;
        jawa.save((err, data) => {
          if (err) return process.stderr.write(err + "\n");

          this.jawa = data;
          done();
        });
      });
    });

    it("resolves a tie with a message", (done) => {
      request("localhost:" + this.port)
        .get("/api/battle")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.starTrekPower).to.eql(res.body.starWarsPower);
          expect(res.body.msg).to.eql(
            res.body.starTrekName + " and " + res.body.starWarsName + " battle to a draw!"
          );
          done();
        });
    });
  });
});
