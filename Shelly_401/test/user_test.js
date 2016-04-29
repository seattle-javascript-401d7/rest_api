const expect = require('chai').expect;
const User = require(__dirnmae + '/../models/users');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

describe('user hash', () => {
    before((done) => {
mongoose.connect('mongodb://localhost/hash_test');
newUser.save((err, data) => {
if (err) throw err;
this.user = data;
done();

});
    });
after((done) => {
mongoose.connection.db.dropDataBase(() => {
    mongoose.disconnect(done);
});
});

it('should create hash', (done) => {
this.user.generateFindHash((err, hash) => {
expect(err).to.eql(null);
expect(hash.length).to.not.eql(0);
expect(hash).to.eql(this.user.findHash);
done();
});
});

it('should verify the token', (done) => {
expect(jwt.verify(req.headers.token, process.env.APP_SECRET).to.eql(true);
done();
});
