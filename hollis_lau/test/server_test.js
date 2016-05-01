const chai = require("chai");
const chaiHttp = require("chai-http");
const dirtyChai = require("dirty-chai");

chai.use(chaiHttp);
chai.use(dirtyChai);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const app = require(__dirname + "/../_server");

describe("Server", () => {
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

  it("returns a message on a GET request to root", (done) => {
    request("localhost:" + this.PORT)
      .get("/")
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql(
          "The Star Trek and Star Wars universes collide! Who will prevail?"
        );
        done();
      });
  });

  it("returns a 404 message on a bad route", (done) => {
    request("localhost:" + this.PORT)
      .get("/badroute")
      .end((err, res) => {
        expect(err).to.exist();
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql("Lost in space! (404: Not Found)");
        done();
      });
  });
});
