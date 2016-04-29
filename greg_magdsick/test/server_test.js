'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;


process.env.PORT = 5050;
process.env.MONGOLAB_LOC = 'mongodb://localhost/db_test';
const server = require(__dirname + '/../lib/_server');

describe('Two Resource Test', () => {
  before((done) => {
    request('localhost:5050')
    .post('/api/motor')
    .send({ model: 'Buell_Lightning', displacement: 1200, cylinders: 2, maxSpeed: 140 })
    .end();
    request('localhost:5050')
    .post('/api/pedal')
    .send({ model: 'Sears_Free_Spirit', gears: 10, frameType: 'Steel', maxSpeed: 29.95 })
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
    .send({ model: 'Cervello_S2', gears: 12, frameType: 'Carbon Fiber', maxSpeed: 35.6 })
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
    .send({ model: 'Suzuki_GSXR_750', displacement: 750, cylinders: 3, maxSpeed: 173.5 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.contain('POST to motor successful');
      done();
    });
  });
  it('pedal PUT route works', (done) => {
    request('localhost:5050')
    .put('/api/pedal/Sears_Free_Spirit')
    .send({ model: 'Sears_Free_Spirit', gears: 10, frameType: 'Steel', maxSpeed: 27 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.contain('Update Successful');
      done();
    });
  });
  it('motor PUT route works', (done) => {
    request('localhost:5050')
    .put('/api/motor/Buell_Lightning')
    .send({ model: 'Buell_Lightning', displacement: 1200, cylinders: 2, maxSpeed: 138 })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.contain('Update Successful');
      done();
    });
  });
  it('fast GET route works', (done) => {
    request('localhost:5050')
    .get('/api/fast')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.contain('Suzuki_GSXR_750');
      expect(res.text).to.contain('Cervello_S2');
      expect(res.text).to.not.contain('Buell_Lightning');
      expect(res.text).to.not.contain('Sears_Free_Spirit');
      done();
    });
  });
  it('pedal DELETE route works', (done) => {
    request('localhost:5050')
    .delete('/api/pedal/Sears_Free_Spirit')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Deletion Successful');
      done();
    });
  });
  it('motor DELETE route works', (done) => {
    request('localhost:5050')
    .delete('/api/motor/Buell_Lightning')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('Deletion Successful');
      done();
    });
  });
});
