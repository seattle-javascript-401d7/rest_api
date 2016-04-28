const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

var port = process.env.PORT = 5050;
process.env.MONGODB_URI = 'mongodb://localhost/slothbearTestDB';
var server = require(__dirname + '/../server');

var Sloth = require(__dirname + '/../models/sloth');
var Bear = require(__dirname + '/../models/bear');
var Slothbear = require(__dirname + '/../models/slothbear');
var User = require(__dirname + '/../models/user');

describe('sloths plus bears server', () => {
  after(() => {
    server.close();
  });

  describe('Sloth methods', () => {
    var userToken = '';
    beforeEach(function(done) {
      var newUser = new User({ username: 'test', password: 'test' });
      newUser.save((err, user) => {
        if (err) console.log(err);
        user.generateToken((err, token) => {
          if (err) console.log(err);
          userToken = token;
          this.user = user;
          done();
        });
      });
    });

    describe('POST method', () => {
      after((done) => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });

      it('should POST a new sloth', (done) => {
        request('localhost:' + port)
          .post('/api/sloths')
          .set('token', userToken)
          .send({ name: 'Rick', gender: 'm', weight: 150, strength: 8000 })
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('Rick');
            expect(res.body.strength).to.eql(8000);
            done();
          });
      });
    });

    describe('the GET method', () => {
      it('should get all the sloths', (done) => {
        request('localhost:' + port)
          .get('/api/sloths')
          .set('token', userToken)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            expect(res.body.length).to.eql(0);
            done();
          });
      });
    });

    describe('routes that need a sloth', () => {
      beforeEach((done) => {
        var newSloth = new Sloth({ name: 'Rick', gender: 'm', weight: 150, strength: 8000 });

        newSloth.save((err, data) => {
          if (err) return console.log('error');
          this.sloth = data;
          done();
        });
      });

      afterEach((done) => {
        this.sloth.remove((err) => {
          if (err) return console.log('error');
          done();
        });
      });

      after((done) => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });

      it('should get a sloth', (done) => {
        request('localhost:' + port)
          .get('/api/sloths/' + this.sloth._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('Rick');
            expect(res.body.strength).to.eql(8000);
            done();
          });
      });

      it('should update a sloth', (done) => {
        request('localhost:' + port)
          .put('/api/sloths/' + this.sloth._id)
          .send({ name: 'John Cena', gender: 'm', weight: 270, strength: 7000 })
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('sloth updated');
            done();
          });
      });

      it('should delete the sloth', (done) => {
        request('localhost:' + port)
          .delete('/api/sloths/' + this.sloth._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('sloth deleted');
            done();
          });
      });
    });
  });

  describe('Bear methods', () => {
    var userToken = '';
    beforeEach(function(done) {
      var newUser = new User({ username: 'test', password: 'test' });
      newUser.save((err, user) => {
        if (err) console.log(err);
        user.generateToken((err, token) => {
          if (err) console.log(err);
          userToken = token;
          this.user = user;
          done();
        });
      });
    });

    describe('POST method', () => {
      after((done) => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });

      it('should POST a new bear', (done) => {
        request('localhost:' + port)
          .post('/api/bears')
          .set('token', userToken)
          .send({ name: 'Rick', gender: 'm', weight: 150, strength: 8000 })
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('Rick');
            expect(res.body.strength).to.eql(8000);
            done();
          });
      });
    });

    describe('the GET method', () => {
      it('should get all the bears', (done) => {
        request('localhost:' + port)
          .get('/api/bears')
          .set('token', userToken)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            expect(res.body.length).to.eql(0);
            done();
          });
      });
    });

    describe('routes that need a bear', () => {
      beforeEach((done) => {
        var newBear = new Bear({ name: 'Rick', gender: 'm', weight: 150, strength: 8000 });

        newBear.save((err, data) => {
          if (err) return console.log('error');
          this.bear = data;
          done();
        });
      });

      afterEach((done) => {
        this.bear.remove((err) => {
          if (err) return console.log('error');
          done();
        });
      });

      after((done) => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });

      it('should get a bear', (done) => {
        request('localhost:' + port)
          .get('/api/bears/' + this.bear._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('Rick');
            expect(res.body.strength).to.eql(8000);
            done();
          });
      });

      it('should update a bear', (done) => {
        request('localhost:' + port)
          .put('/api/bears/' + this.bear._id)
          .send({ name: 'John Cena', gender: 'm', weight: 270, strength: 7000 })
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('bear updated');
            done();
          });
      });

      it('should delete the bear', (done) => {
        request('localhost:' + port)
          .delete('/api/bears/' + this.bear._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('bear deleted');
            done();
          });
      });
    });
  });

  describe('Slothbear methods', () => {
    var userToken = '';
    beforeEach(function(done) {
      var newUser = new User({ username: 'test', password: 'test' });
      newUser.save((err, user) => {
        if (err) console.log(err);
        user.generateToken((err, token) => {
          if (err) console.log(err);
          userToken = token;
          this.user = user;
          done();
        });
      });
    });

    describe('Mating method', () => {
      before((done) => {
        var newSloth = new Sloth({ name: 'Rick', gender: 'm', weight: 150, strength: 8000 });
        newSloth.save((err) => {
          if (err) return console.log('error');
          var newBear = new Bear({ name: 'Rick', gender: 'm', weight: 150, strength: 8000 });
          newBear.save((err) => {
            if (err) return console.log('error');
            done();
          });
        });
      });

      after((done) => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });

      it('should make a new slothbear', (done) => {
        request('localhost:' + port)
          .get('/api/mate')
          .set('token', userToken)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.hasOwnProperty('name')).to.eql(true);
            expect(res.body.hasOwnProperty('gender')).to.eql(true);
            expect(res.body.hasOwnProperty('weight')).to.eql(true);
            expect(res.body.hasOwnProperty('strength')).to.eql(true);
            done();
          });
      });
    });

    describe('the GET method', () => {
      it('should get all the slothbears', (done) => {
        request('localhost:' + port)
          .get('/api/slothbears')
          .set('token', userToken)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(Array.isArray(res.body)).to.eql(true);
            expect(res.body.length).to.eql(0);
            done();
          });
      });
    });

    describe('routes that need a slothbear', () => {
      beforeEach((done) => {
        var newSlothbear = new Slothbear({ name: 'Rick', gender: 'm', weight: 150, strength: 80 });

        newSlothbear.save((err, data) => {
          if (err) return console.log('error');
          this.slothbear = data;
          done();
        });
      });

      afterEach((done) => {
        this.slothbear.remove((err) => {
          if (err) return console.log('error');
          done();
        });
      });

      after((done) => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      });

      it('should get a slothbeaer', (done) => {
        request('localhost:' + port)
          .get('/api/slothbears/' + this.slothbear._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.name).to.eql('Rick');
            expect(res.body.strength).to.eql(80);
            done();
          });
      });

      it('should update a slothear', (done) => {
        request('localhost:' + port)
          .put('/api/slothbears/' + this.slothbear._id)
          .send({ name: 'John Cena', gender: 'm', weight: 270, strength: 7000 })
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('slothbear updated');
            done();
          });
      });

      it('should delete the slothbear', (done) => {
        request('localhost:' + port)
          .delete('/api/slothbears/' + this.slothbear._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res.body.msg).to.eql('slothbear deleted');
            done();
          });
      });
    });
  });
});
