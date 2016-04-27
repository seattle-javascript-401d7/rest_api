const chai = require('chai');
const epxect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 1234;
process.env.MONGODB_URI = 'mongodb://localhost/auth_test_db'
const server = require(__dirname + '/../server');
const User = require(__dirname + '/../models/privateModels/user');
