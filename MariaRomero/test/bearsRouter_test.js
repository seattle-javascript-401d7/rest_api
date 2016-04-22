const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
var port = process.env.PORT = 5555;
process.env.MONGODB_URI = 'mongodb://localhost/animals_testDB';
var server = require(__dirname + '/../lib/server');
