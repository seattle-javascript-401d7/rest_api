'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const Motor = require(__dirname + '/../models/motor');
const Pedal = require(__dirname + '/../models/pedal');

process.env.PORT = 5050;
process.env.MONGOLAB_LOC = 'mongodb://localhost/db_test';
const server = require(__dirname + '/../lib/server');

describe('Two Resource Test', () => {
  before((done) => {
    request('localhost:5050')
    .post('/api/motor')
    .send({ model: 'Buell Lightning', displacement: 1200, cylinders: 2, maxSpeed: 140 })
    .end();
    request('localhost:5050')
    .post('/api/pedal')
    .send({ model: 'Sears Free Spirit', gears: 10, frameType: 'Steel', maxSpeed: 29.95 })
    .end();
    done();
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect();
      server.close();
      done();
    });
  });
  it('pedal GET route works', (done) => {
    request('localhost:5050')
    .get('/api/pedal')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('motor GET route works', (done) => {
    request('localhost:5050')
    .get('/api/motor')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('pedal POST route works', (done) => {
    request('localhost:5050')
    .post('/api/pedal')
    .send({ model: 'Cervello S2', gears: 12, frameType: 'Carbon Fiber', maxSpeed: 35.6 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.contain('POST to pedal successful');
      done();
      });
    });
  it('motor POST route works', (done) => {
    request('localhost:5050')
    .post('/api/motor')
    .send({ model: 'Suzuki GSXR 750', displacement: 750, cylinders: 3, maxSpeed: 173.5 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.contain('POST to motor successful');
      done();
    });
  });
  it('pedal PUT route works');
  it('motor PUT route works');
  it('fast GET route works');
  it('pedal DELETE route works');
  it('motor DELETE route works');
});
