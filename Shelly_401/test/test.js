const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
const Mug = require(__dirname + '/../models/mug');
const Vinyl = require(__dirname + '/../models/vinyls');
process.env.MONG_URI = 'mongodb://localhost/thursday_db';
require(__dirname + '/../server');

describe('the POST', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should post mugs', (done) => {
    request('localhost:' + port)
    .post('/api/mugs')
    .send({ place: 'Algonquin Hotel', city: 'NYC', drinkPref: 'bathtub gin' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.place).to.eql('Algonquin Hotel');
      expect(res.body.city).to.eql('NYC');
      expect(res.body.drinkPref).to.eql('bathtub gin');
      done();
    });
  });

  it('should post vinyl', (done) => {
    request('localhost:' + port)
    .post('/api/vinyl')
    .send({ album: 'Surfing with the Alien', artist: 'Joe Satriani', purchasedAt: 'Spin Cycle' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.album).to.eql('Surfing with the Alien');
      expect(res.body.artist).to.eql('Joe Satriani');
      expect(res.body.purchasedAt).to.eql('Spin Cycle');
      done();
    });
  });
});


describe('the mugs GET', () => {
  it('should get the mugs', (done) => {
    request('localhost:' + port)
    .get('/api/mugs')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });


  it('should get the vinyls', (done) => {
    request('localhost:' + port)
    .get('/api/vinyl')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});


describe('additional', () => {
  beforeEach((done) => {
    var newMug = new Mug({ place: 'testPlace', city: 'testCity', drinkPref: 'testDrink' });
    var newVinyl = new Vinyl({ album: 'testAlbum',
    artist: 'testArtist',
    purchasedAt: 'testStore' });
    newMug.save((err, data) => {
      expect(err).to.eql(null);
      this.mug = data;
      newVinyl.save((err, data) => {
        expect(err).to.eql(null);
        this.vinyl = data;
        done();
      });

});

  afterEach((done) => {
    this.mug.remove((err) => {
      expect(err).to.eql(null);
    done();
    });

    this.vinyl.remove((err) => {
      expect(err).to.eql(null);
      done();
    });
    done();
  });

    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
  });


it('should change mug identity on PUT', (done) => {
  request('localhost:' + port)
  .put('/api/mugs/' + this.mug._id)
  .send({ place: 'The Quan\'s', city: 'Valencia', drinkPref: 'scotch' })
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res.body.msg).to.eql('Mugs updated');
    done();
});
});

it('should change vinyl identity on PUT', (done) => {
  request('localhost:' + port)
  .put('/api/vinyl/' + this.vinyl._id)
  .send({ album: 'World without Tears', artist: 'Lucinda Williams', purchasedAt: 'Music Emporium' })
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res.body.msg).to.eql('Vinyl updated');
    done();
});
});

it('should remove mugs on DELETE', (done) => {
  request('localhost:' + port)
  .delete('/api/mugs/' + this.mug._id)
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res.body.msg).to.eql('Mugs record deleted');
    done();
  });
});

it('should remove vinyl on DELETE', (done) => {
  request('localhost:' + port)
  .delete('/api/vinyl/' + this.vinyl._id)
  .end((err, res) => {
    expect(err).to.eql(null);
    expect(res.body.msg).to.eql('Vinyl record deleted');
    done();
  });
    });
      });
});
