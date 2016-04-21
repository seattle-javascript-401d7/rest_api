'use strict';
const Router = require('express').Router;
const Superhero = require(__dirname + '/../app/models/superhero');
const Villain = require(__dirname + '/../app/models/villain');
const bodyParser = require('body-parser').json();
