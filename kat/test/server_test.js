const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');

const port = process.env.PORT = 1234;
process.env.MONGO_URI = 'mongodb://localhost/pet_test_db';

require(__dirname + '/../server.js');
const Pet = require(__dirname + '/../models/petModel.js');

describe('POST method', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a new pet instance', (done) => {
    request('localhost:' + port)
    .post('/api/pet')
    .send({name: 'Shebabeba the Boss Bebasheba', nickName: 'Beebee', favoriteActivity: 'looking down on others'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.nickName).to.eql('Beebee');
      done();
    });
  });
});

describe('GET method', () => {
  it('should get "/pet"', (done) => {
    request('localhost:' + port)
    .get('/api/pet')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
});

describe('Routes that need content to work', () => {
  beforeEach((done) => {
    this.newPet = new Pet({ name: 'TestCat', nickName: 'muffin', favoriteActivity: 'feather tag' });
    newPet.save((err, data) => {
      if(err) {
        console.log(err);
        // return res.status(500).json(data);
      }
      this.bear = data;
      done();
    });
  });
  afterEach((done) => {
    this.bear.remove((err) => {
      console.log(err);
      done();
    });
  });

  it('should be able to PUT a pet', (done) => {
    request('localhost:' + port)
    .put('/api/pet' + this.bear._id)
    .send({ name: 'Noodle', nickName: 'Nunu', favoriteActivity: 'hissing' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Updated a pet entry with put.');
      done();
    });
  });

  it('should be able to DELETE a pet entry', (done) => {
    request('localhost:' + port)
    .delete('/api/pet' + this.bear._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).t0.eql('Deleted a pet entry.');
      done();
    });
  });
});
