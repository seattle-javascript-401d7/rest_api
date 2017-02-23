const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const User = require(__dirname + "/../models/user");
const StarWarsChar = require(__dirname + "/../models/star_wars_char");
const app = require(__dirname + "/../_server");

describe("Star Wars resource", () => {
  before((done) => {
    this.portBackup = process.env.PORT;
    this.mongoDbUriBackup = process.env.MONGODB_URI;
    this.appSecretBackup = process.env.APP_SECRET;
    this.PORT = process.env.PORT = 1234;
    this.MONGODB_URI = process.env.MONGODB_URI = "mongodb://localhost/scifi_test";
    this.APP_SECRET = process.env.APP_SECRET = "testsecret";
    this.server = app(this.PORT, this.MONGODB_URI, () => {
      process.stdout.write("Test server up on PORT " + this.PORT + "\n");
      done();
    });
  });

  after((done) => {
    process.env.PORT = this.portBackup;
    process.env.MONGODB_URI = this.mongoDbUriBackup;
    process.env.APP_SECRET = this.appSecretBackup;
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        this.server.close(done);
      });
    });
  });

  describe("POST method", () => {
    before((done) => {
      var newUser = new User({ username: "testuser", password: "testpassword" });

      newUser.generateHashPass(newUser.password);
      newUser.save((err, user) => {
        if (err) {
          throw err;
        }

        user.generateToken((err, token) => {
          if (err) {
            throw err;
          }

          this.token = token;
          done();
        });
      });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(done);
    });

    it("creates a new Star Wars character", (done) => {
      request("localhost:" + this.PORT)
        .post("/api/starwarschars")
        .set("token", this.token)
        .send({
          name: "Luke Skywalker",
          gender: "M",
          weapon: "Lightsaber",
          power: 10,
          planet: "Tatooine"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
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
    it("reads all Star Wars characters", (done) => {
      request("localhost:" + this.PORT)
        .get("/api/starwarschars")
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
      var newUser = new User({ username: "testuser", password: "testpassword" });

      newUser.generateHashPass(newUser.password);
      newUser.save((err, user) => {
        if (err) {
          throw err;
        }

        user.generateToken((err, token) => {
          if (err) {
            throw err;
          }

          this.token = token;
          done();
        });
      });
    });

    before((done) => {
      var newStarWarsChar = new StarWarsChar({
        name: "Han Solo",
        gender: "M",
        weapon: "Heavy blaster pistol",
        power: 7,
        planet: "Corellia"
      });

      newStarWarsChar.save((err, data) => {
        if (err) {
          throw err;
        }

        this.starWarsChar = data;
        done();
      });
    });

    it("updates the Star Wars character on a PUT request", (done) => {
      request("localhost:" + this.PORT)
        .put("/api/starwarschars/" + this.starWarsChar._id)
        .set("token", this.token)
        .send({
          name: "Chewbacca",
          gender: "M",
          weapon: "Bowcaster",
          power: 8,
          planet: "Kashyyyk"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Star Wars character updated!");
          done();
        });
    });

    it("deletes the Star Wars character on a DELETE request", (done) => {
      request("localhost:" + this.PORT)
        .delete("/api/starwarschars/" + this.starWarsChar._id)
        .set("token", this.token)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Star Wars character deleted!");
          done();
        });
    });
  });
});
