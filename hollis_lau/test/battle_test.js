const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const StarTrekChar = require(__dirname + "/../models/star_trek_char");
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const app = require(__dirname + "/../_server");

describe("Battle resource", () => {
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

  describe("battle endpoint with empty collection", () => {
    it("instructs user to add characters", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/battle")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql(
            "Please add at least one Star Trek and one Star Wars character!"
          );
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

      picard.save()
        .then(() => {
          return laforge.save();
        })
        .then(() => {
          return skywalker.save();
        })
        .then(() => {
          return binks.save();
        })
        .catch((e) => {
          if (e) {
            throw new Error("Could not save character!");
          }
        })
        .then(() => {
          done();
        });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(() => done());
    });

    it("compares power levels of two characters and returns a victor", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/battle")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.winner.power).to.be.above(res.body.loser.power);
          expect(res.body.msg).to.eql(
            res.body.winner.name + " defeats " + res.body.loser.name + " with a " +
            res.body.winner.weapon + "!"
          );
          done();
        });
    });
  });

  describe("battle endpoint with equal power levels", () => {
    before((done) => {
      var tribble = new StarTrekChar({ name: "Tribble", power: 1, weapon: "Fur" });
      var jawa = new StarWarsChar({ name: "Jawa", power: 1, weapon: "Tools" });

      tribble.save()
        .then(() => {
          return jawa.save();
        })
        .catch((e) => {
          if (e) {
            throw new Error("Could not save character!");
          }
        })
        .then(() => {
          done();
        });
    });

    it("resolves a tie with a message", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/battle")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.char1.power).to.eql(res.body.char2.power);
          expect(res.body.msg).to.eql(
            res.body.char1.name + " and " + res.body.char2.name + " battle to a draw!"
          );
          done();
        });
    });
  });
});
