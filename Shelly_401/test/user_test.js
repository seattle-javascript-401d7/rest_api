const expect = require('chai').expect;
const User = require(__dirname + '/../models/users');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);
const request = chai.request;
const app = require(__dirname + '/../_server');
var server;
const port = 1235;

process.env.APP_SECRET = 'testSecret';

describe('the sigup/signin routes', () => {
    before((done) => {
        server = app(port, 'mongodb://localhost/authTest_db', () => {
            console.log('server up on' + port);
            var newUser = new User({ username: 'TestName', password: 'TestPW'
        });
        newUser.generateHash('TestPW');
        newUser.save((err, data) => {
            if (err) throw err;
            this.user = data;
            this.token = data.generateToken();
        });
        done();
    });
});
after((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.disconnect(() => {
            server.close(() => {
                done();
            });
        });
    });

});
it('should create user, generate token on post request', (done) => {
request('localhost:' + port)
.post('/api/signUP')
.send({ username: 'TestName1', password: 'TestPW1' })
.end((err, res) => {
    expect(err).to.eql(null);
    expect(res.status).to.eql(200);
    User.findOne({ username: 'TestName1' }, (err, data) => {
        expect(err).to.eql(null);
        expect(data).to.not.eql(null);
        expect(res.body.token).to.not.eql(null);
        done();
    });

});
});

it('should login and generate token at signin', (done) => {
request('localhost:' + port)
.get('/api/signin')
.auth('TestName', 'TestPW')
.end((err, res) => {
expect(err).to.eql(null);
expect(res.status).to.eql(200);
expect(res.body.token).to.not.eql(null);
done();
});
});
});
