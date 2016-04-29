// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const expect = chai.expect;
// const main = require(__dirname + '/test_server');
// const request = chai.request;
// const origin = 'localhost:4000/api';
// const Player = require(__dirname + '/../models/player');
// 
// describe('The Player API', () => {
//   // first launch the server
//   var serverListen = null;
//   before(() => {
//     serverListen = main.server.listen(4000);
//     main.db.connect(main.dbconnect);
//   });
//   after((done) => {
//     main.db.connection.db.dropDatabase(() => {
//       main.db.disconnect();
//       serverListen.close();
//       done();
//     });
//   });
//
// var newUserToken = null;
// before((done) => {
//   var newUser = {
//     email: 'newuser@gmail.com',
//     username: 'newuser',
//     password: '12345678'
//   };
//   request(origin)
//   .post('/signup')
//   .send(newUser)
//   .end((err, res) => {
//     if (err) throw err;
//     newUserToken = res.body.token;
//     done();
//   });
// });
//
//   it('should be able to GET all the players', (done) => {
//     request(origin)
//     .get('/players')
//     .set('token', newUserToken)
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.status).to.eql(200);
//       expect(res.body).to.be.an('array');
//       done();
//     });
//   });
//   it('should be able to POST up a new player', (done) => {
//     request(origin)
//     .post('/players/')
//     .set('token', newUserToken)
//     .send({ name: 'Basher McGee', city: 'Concussionville', position: 'Running Back', age: 22 })
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.status).to.eql(200);
//       expect(res.body.name).to.eql('Basher McGee');
//       expect(res.body).to.have.property('_id');
//       done();
//     });
//   });
//
//   describe('Tests that require a populated database', () => {
//     beforeEach((done) => {
//       Player.create({ name: 'test player' }, (err, data) => {
//         if (err) throw err;
//         this.testPlayer = data;
//         done();
//       });
//     });
//
//     it('should be able to PUT up new info for a player', (done) => {
//       request(origin)
//       .put('/players/' + this.testPlayer._id)
//       .set('token', newUserToken)
//       .send({ name: 'Cowabunga Johnson', city: 'Milk City', position: 'Inverted', age: 33 })
//       .end((err, res) => {
//         expect(err).to.eql(null);
//         expect(res.status).to.eql(200);
//         expect(res.body.msg).to.eql('put good');
//         done();
//       });
//     });
//
//     it('should be able to DELETE a player', (done) => {
//       request(origin)
//       .delete('/players/' + this.testPlayer._id)
//       .set('token', newUserToken)
//       .end((err, res) => {
//         expect(err).to.eql(null);
//         expect(res.status).to.eql(200);
//         done();
//       });
//     });
//   });
// });
