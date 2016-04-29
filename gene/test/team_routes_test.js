// const chai = require('chai');
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const expect = chai.expect;
// const main = require(__dirname + '/test_server');
// const request = chai.request;
// const origin = 'localhost:4000/api';
// const Team = require(__dirname + '/../models/team');
//
// describe('The Team API', () => {
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
//   var newUserToken = null;
//     before((done) => {
//       var newUser = {
//         email: 'newuser@gmail.com',
//         username: 'newuser',
//         password: '12345678'
//       };
//       chai.request(origin)
//         .post('/signup')
//         .send(newUser)
//         .end((err, res) => {
//           expect(err).to.eql(null);
//           expect(res).to.have.a.status(200);
//           expect(res.body.msg).to.eql('Signup was a huge success!');
//           newUserToken = res.body.token;
//           done();
//         });
//     });
//
//   it('should be able to GET all the teams', (done) => {
//     request(origin)
//     .get('/teams')
//     .set('token', newUserToken)
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.status).to.eql(200);
//       expect(res.body).to.be.an('array');
//       done();
//     });
//   });
//   it('should be able to POST up a new team', (done) => {
//     request(origin)
//     .post('/teams/')
//     .set('token', newUserToken)
//     .send({ name: 'Bashers', city: 'Concussionville', mascot: 'Dinged Helmet', age: 99 })
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.status).to.eql(200);
//       expect(res.body.name).to.eql('Bashers');
//       expect(res.body).to.have.property('_id');
//       done();
//     });
//   });
//
//   describe('Tests that require a populated database', () => {
//     beforeEach((done) => {
//       Team.create({ name: 'test team' }, (err, data) => {
//         if (err) throw err;
//         this.testTeam = data;
//         done();
//       });
//     });
//
//     it('should be able to PUT up new info for a team', (done) => {
//       request(origin)
//       .put('/teams/' + this.testTeam._id)
//       .set('token', newUserToken)
//       .send({ name: 'Cows', city: 'Milk City', mascot: 'pig', age: 66 })
//       .end((err, res) => {
//         expect(err).to.eql(null);
//         expect(res.status).to.eql(200);
//         expect(res.body.msg).to.eql('put good');
//         done();
//       });
//     });
//
//     it('should be able to DELETE a team', (done) => {
//       request(origin)
//       .delete('/teams/' + this.testTeam._id)
//       .set('token', newUserToken)
//       .end((err, res) => {
//         expect(err).to.eql(null);
//         expect(res.status).to.eql(200);
//         done();
//       });
//     });
//   });
//   });
