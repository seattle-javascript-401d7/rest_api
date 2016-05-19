#REST API

##Description
This is a two rest resource rest API with Express that's backed by Mongo. The two databases contain a collection of Sith and Jedi with stats about them. This rest API implements all of the following REST requests:

* GET
* POST
* PUT
* DELETE

*****IN ORDER TO USE MONGO PLEASE REFER TO THESE DOCS*****
[https://www.mongodb.org/][MONGO HOMEPAGE]
[http://openmymind.net/mongodb.pdf](MONGO)

##Testing
This assignment tests against GET request for a 'battle' between Jedi and Sith on the router_test file. It also tests to make sure that new Jedi/Sith are created and sent to the Mongo database.

##Dependencies
* EXPRESS
* MONGO
* BODY-PARSER

##Dev-Dependencies
* CHAI
* CHAI-HTTP
* GULP
* GULP-ESLINT
* GULP-MOCHA
* MOCHA
