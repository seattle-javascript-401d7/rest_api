const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 2000;
process.env.MONGO_URI = 'mongodb://localhost/db';
require(__dirname + '/../app');
const Droid = require(__dirname + '/../models/droid');
const Jawa = require(__dirname + '/../models/jawa');
const serverErrHandler = require(__dirname + '/../lib/serverErrHandler');

describe('the POST and GET method for the Droids:', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should POST method', (done) => {
    request('localhost:' + port)
    .post('/api/droids')
    .send({ name: 'Ben', address: 'Naboo', email: 'ben@gmail.com' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Ben');
      expect(res.body.email).to.eql('ben@gmail.com');
      done();
    });
  });

  it('should get all droids with GET method', (done) => {
    request('localhost:' + port)
    .get('/api/droids')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.length).to.eql(1);
      done();
    });
  });
});

describe('the PUT and DELETE method for the droids: ', () => {
  beforeEach((done) => {
    var newDroid = new Droid({ name: 'C3PO', address: 'Imperial Planet', email: 'C3PO@gmail.com' });
    newDroid.save((err, data) => {
      if (err) return serverErrHandler(err);
      this.droid = data;
      done();
    });
  });

  afterEach((done) => {
    this.droid.remove(() => {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should upgrade droid to C4PO using PUT method', (done) => {
    request('localhost:' + port)
    .put('/api/droids/' + this.droid._id)
    .send({ name: 'C4PO', address: 'Naboo', email: 'C4PO@gmail.com' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Upgrade complete!');
      done();
    });
  });


  it('should dismantle C4PO due to bad upgrade with DELETE method', (done) => {
    request('localhost:' + port)
    .delete('/api/droids/' + this.droid._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Droid terminated!');
      done();
    });
  });
});

describe('the POST and GET method for the jawas:', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should POST method for the jawas', (done) => {
    request('localhost:' + port)
    .post('/api/jawas')
    .send({ name: 'Seth', address: 'Tatooine', email: 'seth@gmail.com' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Seth');
      expect(res.body.email).to.eql('seth@gmail.com');
      done();
    });
  });

  it('should get all the jawas using GET method', (done) => {
    request('localhost:' + port)
    .get('/api/jawas')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.length).to.eql(1);
      done();
    });
  });
});

describe('the PUT and DELETE method for the jawas: ', () => {
  beforeEach((done) => {
    var newJawa = new Jawa({ name: 'Rota', address: 'Tatooine', email: 'rota@gmail.com' });
    newJawa.save((err, data) => {
      if (err) return serverErrHandler(err);
      this.jawa = data;
      done();
    });
  });

  afterEach((done) => {
    this.jawa.remove((err) => {
      if (err) return serverErrHandler(err);
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should change jawa to Kuma using PUT method', (done) => {
    request('localhost:' + port)
    .put('/api/jawas/' + this.jawa._id)
    .send({ name: 'Kuma', address: 'Tatooine', email: 'kuma@gmail.com' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Jawa changed!');
      done();
    });
  });


  it('should punish jawa for not making enough profit with DELETE method', (done) => {
    request('localhost:' + port)
    .delete('/api/jawas/' + this.jawa._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('Nexu had a jawa snack!');
      done();
    });
  });
});
